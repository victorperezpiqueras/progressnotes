import { CardsService } from './models/cards.service';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import { Card } from './models/card.model';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
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

  switchingCard = false;

  constructor(
    private cardsService: CardsService,
    public modalController: ModalController,
    public alertController: AlertController,
    public toastController: ToastController
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
        this.cards = cards.sort((a, b) => b.creationDate - a.creationDate);
        console.log(this.cards);
      });
  }

  get getDoneCards() {
    return this.cards.filter((card) => card.done);
  }

  get getUndoneCards() {
    return this.cards.filter((card) => !card.done);
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
        mode: 'create',
      },
    });
    modal.onDidDismiss().then((modalDataResponse) => {
      if (modalDataResponse.data) {
        this.cardsService.createCard(modalDataResponse.data.card).subscribe((data) => {
          console.log(data);
          this.presentToast('created');
          this.reloadCards();
        });
      }
    });

    return await modal.present();
  }

  async deleteCard(event: any, card: Card) {
    event.stopPropagation();
    const alert = await this.alertController.create({
      header: `Delete issue ${card.issueId}`,
      /* subHeader: '', */
      message: `Are you sure you want to delete the issue ${card.issueId}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Delete',
          role: 'delete',
          handler: () => {
            this.cardsService.deleteCard(card).subscribe((data) => {
              this.presentToast('deleted');
              this.reloadCards();
            });
          },
        },
      ],
    });

    await alert.present();
  }

  async editCard(card: Card) {
    if (this.switchingCard) return;
    const modal = await this.modalController.create({
      component: CardCreateModal,
      componentProps: {
        suffix: this.suffix,
        card: card,
        mode: 'edit',
      },
    });
    modal.onDidDismiss().then((modalDataResponse) => {
      if (modalDataResponse.data) {
        let editCard: Card = modalDataResponse.data.card;
        editCard._id = card._id;
        this.cardsService.editCard(editCard).subscribe((data) => {
          this.presentToast('edited');
          this.reloadCards();
        });
      }
    });
    return await modal.present();
  }

  switchDone(event: any, card: Card) {
    event.stopPropagation();
    this.switchingCard = true;
    card.done = !card.done;
    this.cardsService.editCard(card).subscribe((data) => {
      this.presentToast('switched to done');
      this.reloadCards();
      this.switchingCard = false;
    });
  }

  getSwitchColor(done: boolean) {
    if (!done) return 'danger';
    else return 'success';
  }

  async presentToast(action: string, duration: number = 1000) {
    const toast = await this.toastController.create({
      message: `Issue ${action} successfully`,
      duration: duration,
    });
    toast.present();
  }
}
