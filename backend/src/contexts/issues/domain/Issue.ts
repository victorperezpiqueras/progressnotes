export default class Issue {
  readonly issueId: string;
  readonly description: string;
  readonly estimation: number;
  readonly type: string;
  readonly alone: boolean;
  readonly done: boolean;
  readonly creationDate: number;
  readonly doneDate: number;
  readonly sprint: number;
  constructor({
    issueId,
    description,
    estimation,
    type,
    alone,
    done,
    creationDate,
    doneDate,
    sprint,
  }: {
    issueId: string;
    description: string;
    estimation: number;
    type: string;
    alone: boolean;
    done: boolean;
    creationDate: number;
    doneDate: number;
    sprint: number;
  }) {
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
}
