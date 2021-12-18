import { DeleteIssue } from './../../contexts/issues/application/DeleteIssue';
import { EditIssue } from './../../contexts/issues/application/EditIssue';
import { CreateIssue } from './../../contexts/issues/application/CreateIssue';
import { GetAllIssues } from './../../contexts/issues/application/GetAllIssues';
import { Request, Response } from 'express';
import IssueMongoRepository from '../../contexts/issues/infrastructure/IssueMongoRepository';

export default class IssuesController {
  async getAll(req: Request, res: Response) {
    try {
      const useCase = new GetAllIssues(new IssueMongoRepository());
      const issues = await useCase.run();
      console.log(issues);
      res.json(issues);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const useCase = new CreateIssue(new IssueMongoRepository());
      const { id, issueId, description, estimation, type, alone, done } = req.body;
      const issue = await useCase.run(issueId, description, estimation, type, alone, done);
      res.json(issue);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async edit(req: Request, res: Response) {
    try {
      const useCase = new EditIssue(new IssueMongoRepository());
      const { issueId, description, estimation, type, alone, done } = req.body;
      const id = req.params.id;
      const issue = await useCase.run(id, { issueId, description, estimation, type, alone, done });
      res.json(issue);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const useCase = new DeleteIssue(new IssueMongoRepository());
      const id = req.params.id;
      await useCase.run(id);
      res.json({ res: 'deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
