import express, { Request, Response } from 'express';
import { ReviewService } from '../services/review.service';
import { validateReviewCreate } from '../middlewares/validate.middleware';

const reviewRouter = express.Router();
const reviewService = new ReviewService();

reviewRouter
  .route('/')
  .post(validateReviewCreate, async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const newReview = await reviewService.create(body);

      res.status(201).json(newReview);
    } catch (error) {
      if (error instanceof Error)
        res.status(500).json({ error: error.message });
    }
  })
  .get(async (req: Request, res: Response) => {
    const reviews = await reviewService.test();

    res.status(200).json(reviews);
  });

export default reviewRouter;
