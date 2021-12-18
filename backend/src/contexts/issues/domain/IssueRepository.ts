import Issue from './Issue';

export default interface IssueRepository {
  getAll(): Promise<Issue[]>;
  create(issue: Issue): Promise<Issue>;
  edit(id: any, issue: Issue): Promise<Issue>;
  delete(id: any): Promise<Issue>;
}
