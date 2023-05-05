import { CreateReviewDto } from '../schemas/review.schema';
import dataSource from '../libs/postgres.pool';
import { Reviews } from '../db/models/review.model';
import { isps } from '../db/models/isp.model';
import isInsideRadius from '../utils/insideRadius';

export class ReviewService {
  private reviewsRepository;
  private ispRepository;

  constructor() {
    this.reviewsRepository = dataSource.getRepository(Reviews);
    this.ispRepository = dataSource.getRepository(isps);
  }

  async create(review: CreateReviewDto) {
    const isp = await this.ispRepository.findOne({
      where: { id: review.ispId },
    });

    if (!isp)
      return {
        error: 'ISP not found',
      };

    const newReview = new Reviews();
    newReview.review = review.review;
    newReview.rating = review.rating;
    newReview.isp = isp;
    newReview.geometry = {
      type: 'Point',
      coordinates: review.coordinates,
    };

    await this.reviewsRepository.save(newReview);

    return newReview;
  }

  async getByAGivenPoint(point: number[], radius: number) {
    const reviews = await this.reviewsRepository.find({
      relations: ['isp'],
    });

    const reviewsInsideTheRadius = reviews.filter((review) =>
      isInsideRadius(
        point[0],
        point[1],
        review.geometry.coordinates[0],
        review.geometry.coordinates[1],
        radius
      )
    );

    return reviewsInsideTheRadius;
  }

  async delete(id: number) {
    const review = await this.reviewsRepository.findOne({
      where: { id },
    });

    if (!review) throw new Error('Review not found');

    await this.reviewsRepository.remove(review);
  }
}
