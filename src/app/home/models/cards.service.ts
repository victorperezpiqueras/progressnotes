import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Card } from './card.model';

const routes = {
  get: () => `/issues/`,
  post: () => `/issues/`,
  put: (card: Card) => `/issues/${card._id}`,
  delete: (card: Card) => `/issues/${card._id}`,
};

export interface CardContext {
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  constructor(private httpClient: HttpClient) {}

  getCards(): Observable<Card[]> {
    return this.httpClient.get(routes.get()).pipe(map((body: any) => body));
  }
  createCard(card: Card): Observable<any> {
    return this.httpClient.post(routes.post(), card).pipe(map((body: any) => body));
  }
  editCard(card: Card): Observable<any> {
    return this.httpClient.put(routes.put(card), card).pipe(map((body: any) => body));
  }
  deleteCard(card: Card): Observable<any> {
    return this.httpClient.delete(routes.delete(card)).pipe(map((body: any) => body));
  }

  getIssueTypes() {
    return { titles: ['bug', 'task', 'story', 'spike'], colors: ['#eb445a', '#3880ff', '#2dd36f', '#ffc409'] };
  }
}
