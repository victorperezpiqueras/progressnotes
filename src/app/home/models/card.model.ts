export class Card {
  _id: string;
  issueId: string;
  description: string;
  estimation: number;
  type: string;
  alone: boolean;
  done: boolean;
  creationDate: number;
  doneDate: number;
  sprint: number;
  constructor(
    _id: string,
    issueId: string,
    description: string,
    estimation: number,
    type: string,
    alone: boolean,
    done: boolean,
    creationDate: number,
    doneDate: number,
    sprint: number
  ) {
    this._id = _id;
    this.issueId = issueId;
    this.description = description;
    this.estimation = estimation;
    this.type = type;
    this.alone = alone;
    this.done = done;
    this.creationDate = creationDate;
    this.doneDate = doneDate;
    this.sprint = sprint;
  }

  setDone() {
    this.doneDate = Date.now();
  }
}
