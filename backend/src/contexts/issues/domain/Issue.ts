export default class Issue {
  readonly issueId: string;
  readonly description: string;
  readonly estimation: number;
  readonly type: string;
  readonly alone: boolean;
  readonly done: boolean;
  constructor({
    issueId,
    description,
    estimation,
    type,
    alone,
    done,
  }: {
    issueId: string;
    description: string;
    estimation: number;
    type: string;
    alone: boolean;
    done: boolean;
  }) {
    this.issueId = issueId;
    this.description = description;
    this.estimation = estimation;
    this.type = type;
    this.alone = alone;
    this.done = done;
  }
}
