import Issue from '../domain/Issue';
import IssueRepository from '../domain/IssueRepository';

export class GetAllIssues {
  private repository: IssueRepository;

  constructor(repository: IssueRepository) {
    this.repository = repository;
  }

  async run(): Promise<Issue[]> {
    return this.repository.getAll();
  }
}
