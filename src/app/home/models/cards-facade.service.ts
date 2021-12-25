import { CardsService } from './cards.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Card } from './card.model';

@Injectable({
  providedIn: 'root',
})
export class CardsFacadeService {
  private _cards$: BehaviorSubject<Card[]>;
  private _loading$: BehaviorSubject<boolean>;

  cards$: Observable<Card[]>;
  loading$: Observable<boolean>;

  constructor(private httpClient: HttpClient, private cardsService: CardsService) {
    this._cards$ = new BehaviorSubject<Card[]>([]);
    this._loading$ = new BehaviorSubject<boolean>(false);

    this.cards$ = this._cards$.asObservable();
    this.loading$ = this._loading$.asObservable();
    this.doSubscriptions();
  }

  doSubscriptions() {
    this._loading$.next(true);
    this.getCards().subscribe((cards: Card[]) => {
      this._cards$.next(cards);
      this._loading$.next(false);
    });
  }

  getCards() {
    return this.cardsService.getCards();
  }
  async createCard(card: Card) {
    await this.cardsService.createCard(card);
    this.doSubscriptions();
  }
  async editCard(card: Card) {
    await this.cardsService.editCard(card);
    this.doSubscriptions();
  }
  async deleteCard(card: Card) {
    await this.cardsService.deleteCard(card);
    this.doSubscriptions();
  }
}
