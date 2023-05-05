import express, { Express } from 'express';
import ispRouter from './isps.router';
import reviewRouter from './reviews.router';

const routerApi = (app: Express) => {
  const router = express.Router();

  app.use('/api/v1', router);
  router.use('/reviews', reviewRouter);
  router.use('/isps', ispRouter);
};
3;

export default routerApi;
