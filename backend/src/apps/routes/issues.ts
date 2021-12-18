import express, { Request, Response } from 'express';
import IssuesController from '../controllers/IssuesController';

const router = express.Router();

const issuesController = new IssuesController();

router.get('/', [], (req: Request, res: Response) => {
  console.log('router');
  issuesController.getAll(req, res);
});

router.post('/', (req, res) => {
  issuesController.create(req, res);
});

router.put('/:id', (req, res) => {
  issuesController.edit(req, res);
});

router.delete('/:id', (req, res) => {
  issuesController.delete(req, res);
});

export { router as issuesRouter };
