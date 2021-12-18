import Issue from '../domain/Issue';
import IssueRepository from '../domain/IssueRepository';
import { IssueMongoModel } from './IssueMongo';
import mongoose from 'mongoose';

export default class IssueMongoRepository implements IssueRepository {
  async getAll(): Promise<Issue[]> {
    const allIssues = await IssueMongoModel.find({});
    return allIssues;
  }
  async create(issue: Issue): Promise<Issue> {
    const { issueId, description, estimation, type, alone, done } = issue;
    const mongoIssue = new IssueMongoModel({ issueId, description, estimation, type, alone, done });
    await mongoIssue.save();
    return issue;
  }
  async edit(id: any, issue: Issue): Promise<Issue> {
    const { issueId, description, estimation, type, alone, done } = issue;
    await IssueMongoModel.findByIdAndUpdate(id, { description, estimation, type, alone, done });
    return issue;
  }
  async delete(id: any): Promise<Issue> {
    return IssueMongoModel.findByIdAndDelete(id);
  }
}
