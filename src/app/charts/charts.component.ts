import { CardsService } from './../home/models/cards.service';
import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { Card } from '@app/home/models/card.model';
import { finalize } from 'rxjs';
import { Chart, ChartConfiguration, ChartItem, TooltipItem } from 'chart.js';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  cards: Card[] = [];
  isLoading: boolean = false;

  lineChartData: any;
  lineChartLabels: any;
  lineChartOptions: any;
  lineChartColors: any;
  lineChartLegend: any;
  lineChartPlugins: any;
  lineChartType: any;

  showingCharts: string = 'overview';

  constructor(private cardsService: CardsService) {}

  ngOnInit() {
    this.reloadCards();
  }

  segmentChanged(event: any) {
    this.showingCharts = event.detail.value;
  }

  reloadCards() {
    this.isLoading = true;
    this.cardsService
      .getCards()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((cards: Card[]) => {
        this.cards = cards;
        this.loadWorkDoneChart();
        this.loadWorkTypeChart('chartStoryPointsType', 'storyPoints');
        this.loadWorkTypeChart('chartNumIssuesType', 'numIssues');
        this.loadAloneChart();
      });
  }

  loadWorkDoneChart() {
    const allSprints: number[] = this.cards
      .map((item) => item.sprint)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => a - b);

    let storyPointsData: number[] = [];
    let numIssuesData: number[] = [];
    let x = 0;
    allSprints.forEach((sprint: number) => {
      storyPointsData.push(0);
      numIssuesData.push(0);
      this.cards.forEach((card: Card) => {
        if (card.done && card.sprint === sprint) {
          storyPointsData[x] += card.estimation;
          numIssuesData[x]++;
        }
      });
      x++;
    });
    const ctx = document.getElementById('workDoneChart');
    const chart = new Chart(
      ctx as ChartItem,
      {
        type: 'line',

        data: {
          labels: allSprints,
          datasets: [
            {
              label: 'Story Points',
              data: storyPointsData,
            },
            {
              label: 'Num Issues',
              data: numIssuesData,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              title: {
                display: true,
                text: 'Story Points',
              },
            },
            x: {
              title: {
                display: true,
                text: 'Sprint',
              },
            },
          },
          /* tooltips: {
            callbacks: {
              title: function (tooltipItem: any, data: any) {
                return 'aaaaa';
              },
            },
          }, */
        },
      } as ChartConfiguration
    );
  }

  loadWorkTypeChart(id: string, mode: string) {
    const issueTypes: string[] = this.cardsService.getIssueTypes().titles;
    const issueColors: string[] = this.cardsService.getIssueTypes().colors;

    let storyPointsData: number[] = [];
    let numIssuesData: number[] = [];
    let x = 0;
    issueTypes.forEach((type: string) => {
      storyPointsData.push(0);
      numIssuesData.push(0);
      this.cards.forEach((card: Card) => {
        if (card.done && card.type === type) {
          storyPointsData[x] += card.estimation;
          numIssuesData[x]++;
        }
      });
      x++;
    });
    let data, label;
    if (mode === 'storyPoints') {
      data = storyPointsData;
      label = 'Story Points';
    } else if (mode === 'numIssues') {
      label = 'Num Issues';
      data = numIssuesData;
    }
    const ctx = document.getElementById(id);
    const chart = new Chart(
      ctx as ChartItem,
      {
        type: 'pie',
        data: {
          labels: issueTypes,
          datasets: [
            {
              label: label,
              data: data,
              backgroundColor: issueColors,
            },
          ],
        },
        options: {
          /*  title: {
            display: true,
            text: 'Work By Type',
          }, */
          //responsive: true,
          /* tooltips: {
            mode: 'index',
          }, */
          /*  plugins: {
            tooltip: {
              enabled: true,
            },
          }, */
          tooltips: {
            callbacks: {
              label: function (tooltipItem: any, data: any) {
                var label = data.datasets[tooltipItem.datasetIndex].label || '';

                if (label) {
                  label += ': ';
                }
                label += Math.round(tooltipItem.yLabel * 100) / 100;
                return label;
              },
              /* label: function (tooltipItem: any, data: any) {
                var value = data.datasets[tooltipItem.datasetIndex].data[0];
                var label = data.datasets[tooltipItem.datasetIndex].label;
                return label + ' ' + value + '%';
              },
              title: function (tooltipItem: any, data: any) {
                return data['labels'][tooltipItem[0]['index']];
              },
              label: function (tooltipItem: any, data: any) {
                return data['datasets'][0]['data'][tooltipItem['index']];
              }, */
            },
          },
        },
      } as ChartConfiguration
    );
  }

  loadAloneChart() {
    let numIssuesDataDone: number = 0;
    let numIssuesDataAlone: number = 0;
    this.cards.forEach((card: Card) => {
      if (card.done && card.alone) {
        numIssuesDataAlone++;
      } else if (card.done && !card.alone) {
        numIssuesDataDone++;
      }
    });
    const ctx = document.getElementById('aloneChart');
    const chart = new Chart(
      ctx as ChartItem,
      {
        type: 'pie',
        data: {
          labels: ['Done in Team', 'Done Alone'],
          datasets: [
            {
              label: '',
              data: [numIssuesDataDone, numIssuesDataAlone],
            },
          ],
        },
      } as ChartConfiguration
    );
  }
}
