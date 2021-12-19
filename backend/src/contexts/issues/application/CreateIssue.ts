import Issue from '../domain/Issue';
import IssueRepository from '../domain/IssueRepository';

export class CreateIssue {
  private repository: IssueRepository;

  constructor(repository: IssueRepository) {
    this.repository = repository;
  }

  async run(
    issueId: string,
    description: string,
    estimation: number,
    type: string,
    alone: boolean,
    done: boolean,
    creationDate: number,
    doneDate: number
  ): Promise<Issue> {
    const issue = new Issue({ issueId, description, estimation, type, alone, done, creationDate, doneDate });

    return this.repository.create(issue);
  }
}
