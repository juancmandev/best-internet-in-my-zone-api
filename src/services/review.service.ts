import { CreateReviewDto } from '../schemas/review.schema';

export class ReviewService {
  constructor() {}

  async create(review: CreateReviewDto) {
    const id = Date.now().toString();
    const newReview = { id, ...review };

    return newReview;
  }
}
