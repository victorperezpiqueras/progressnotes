import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Card } from './../models/card.model';
import { Component, Input, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';

export interface CardType {
  value: string;
  displayValue: string;
}

@Component({
  selector: 'card-create-modal',
  templateUrl: 'card-create-modal.component.html',
  styleUrls: ['./card-create-modal.component.scss'],
})
export class CardCreateModal implements OnInit {
  types: CardType[] = [
    { value: 'story', displayValue: 'User Story' },
    { value: 'task', displayValue: 'Task' },
    { value: 'bug', displayValue: 'Bug' },
    { value: 'spike', displayValue: 'Spike' },
  ];

  form: FormGroup;

  @Input()
  private _suffix!: string;
  public get suffix(): string {
    return this._suffix;
  }
  public set suffix(value: string) {
    this._suffix = value;
    this.form.controls['issueId'].setValue(value + '');
  }

  @Input()
  private _card!: Card;
  public get card(): Card {
    return this._card;
  }
  public set card(value: Card) {
    this._card = value;
    this.mode = 'edit';
    this.form.controls['issueId'].setValue(value.issueId);
    this.form.controls['description'].setValue(value.description);
    this.form.controls['type'].setValue(value.type);
    this.form.controls['estimation'].setValue(value.estimation);
    this.form.controls['alone'].setValue(value.alone);
    this.form.controls['done'].setValue(value.done);
  }
  @Input()
  mode: string = 'create';

  constructor(public modalController: ModalController, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      issueId: ['', Validators.required],
      description: ['', Validators.required],
      type: ['task', Validators.required],
      estimation: [null, [Validators.min(0), Validators.max(40)]],
      alone: [true, Validators.required],
      done: [false, Validators.required],
    });
    /* this.modalController. */
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((data) => {});
  }

  save() {
    const card = this.form.value as Card;
    if (this.mode === 'edit') {
      if (card.done && this.card.done !== card.done) {
        card.doneDate = Date.now();
      }
    } else if (this.mode === 'create') {
      card.creationDate = Date.now();
    }

    this.modalController.dismiss({ card });
  }

  parseDate(date: number) {
    return new Date(date).toDateString();
  }

  timeToDone(card: Card) {
    const doneDate = new Date(card.doneDate);
    const creationDate = new Date(card.creationDate);
    const days = card.doneDate - card.creationDate;
    const oneDay = 1000 * 60 * 60; //* 24;
    let diffInHours = Math.round(days / oneDay);
    const diffInDays = Math.floor(diffInHours / 24);
    diffInHours = diffInHours % 24;
    return { days: diffInDays, hours: diffInHours };
  }
}
