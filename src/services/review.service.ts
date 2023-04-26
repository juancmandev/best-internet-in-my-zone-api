import { CreateReviewDto } from '../schemas/review.schema';
import { Pool } from 'pg';
import pool from '../libs/postgres.pool';

export class ReviewService {
  private pool: Pool;

  constructor() {
    this.pool = pool;

    this.pool.on('error', (err: any) => console.error(err));
  }

  async create(review: CreateReviewDto) {
    const id = Date.now().toString();
    const newReview = { id, ...review };

    return newReview;
  }

  async test() {
    const query = 'SELECT * FROM reviews';
    const response = await this.pool.query(query);
    console.log(response.rows);

    return response.rows;
  }
}
