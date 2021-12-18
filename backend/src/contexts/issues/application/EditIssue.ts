import Issue from '../domain/Issue';
import IssueRepository from '../domain/IssueRepository';

export class EditIssue {
  private repository: IssueRepository;

  constructor(repository: IssueRepository) {
    this.repository = repository;
  }

  async run(
    id: any,
    {
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
    }
  ): Promise<Issue> {
    const issue = new Issue({ issueId, description, estimation, type, alone, done });
    return this.repository.edit(id, issue);
  }
}
