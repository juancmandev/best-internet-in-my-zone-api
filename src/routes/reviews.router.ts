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
  .put(async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const reviews = await reviewService.getByAGivenPoint(
        body.point,
        body.radius
      );

      res.status(200).json(reviews);
    } catch (error) {
      if (error instanceof Error)
        res.status(500).json({ error: error.message });
    }
  });
// .delete(async (req: Request, res: Response) => {
//   try {
//     const body = req.body;
//     const id = body.id;

//     await reviewService.delete(id);

//     res.status(200).json({ message: 'Review deleted' });
//   } catch (error) {
//     if (error instanceof Error)
//       res.status(500).json({ error: error.message });
//   }
// });

export default reviewRouter;
