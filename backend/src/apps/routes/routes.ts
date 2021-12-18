import express from 'express';
import { issuesRouter } from './issues';

const router = express.Router();

router.use('/issues', issuesRouter);
// router.use('/ users', usersRouter);

export { router as apiRouter };
