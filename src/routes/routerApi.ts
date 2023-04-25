import express, { Express } from 'express';
import reviewRouter from './reviews.router';

const routerApi = (app: Express) => {
  const router = express.Router();

  app.use('/api/v1', router);
  router.use('/reviews', reviewRouter);
};

export default routerApi;
