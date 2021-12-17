import { CardsService } from './models/cards.service';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import { Card } from './models/card.model';
import { AlertController, ModalController } from '@ionic/angular';
import { CardCreateModal } from './card-create-modal/card-create-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;

  cards: Card[] = [];

  suffix: string = 'MCO-';

  constructor(
    private cardsService: CardsService,
    public modalController: ModalController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.reloadCards();
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
        console.log(cards);
      });
  }

  getCardTypeColor(type: string) {
    switch (type) {
      case 'bug':
        return 'danger';
      case 'task':
        return 'primary';
      case 'story':
        return 'success';
      case 'spike':
        return 'warning';
      default:
        return 'success';
    }
  }

  async addCard() {
    const modal = await this.modalController.create({
      component: CardCreateModal,
      componentProps: {
        suffix: this.suffix,
      },
    });
    modal.onDidDismiss().then((modalDataResponse) => {
      if (modalDataResponse.data) {
        console.log(modalDataResponse);
        this.cardsService.createCard(modalDataResponse.data.card).subscribe((data) => {
          this.reloadCards();
        });
      }
    });

    return await modal.present();
  }

  async deleteCard(card: Card) {
    const alert = await this.alertController.create({
      header: `Delete issue ${card.taskId}`,
      /* subHeader: '', */
      message: `Are you sure you want to delete the issue ${card.taskId}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'Delete',
          role: 'delete',
          handler: () => {
            this.cardsService.deleteCard(card).subscribe((data) => {
              this.reloadCards();
            });
          },
        },
      ],
    });

    await alert.present();
  }

  async editCard(card: Card) {
    const modal = await this.modalController.create({
      component: CardCreateModal,
      componentProps: {
        suffix: this.suffix,
        card: card,
      },
    });
    modal.onDidDismiss().then((modalDataResponse) => {
      if (modalDataResponse.data) {
        console.log(modalDataResponse);
        let editCard: Card = modalDataResponse.data.card;
        editCard.id = card.id;
        this.cardsService.editCard(editCard).subscribe((data) => {
          this.reloadCards();
        });
      }
    });
    return await modal.present();
  }
}
