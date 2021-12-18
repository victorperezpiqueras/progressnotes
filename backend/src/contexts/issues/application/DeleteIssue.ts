import Issue from '../domain/Issue';
import IssueRepository from '../domain/IssueRepository';

export class DeleteIssue {
  private repository: IssueRepository;

  constructor(repository: IssueRepository) {
    this.repository = repository;
  }

  async run(id: any): Promise<Issue> {
    return this.repository.delete(id);
  }
}
