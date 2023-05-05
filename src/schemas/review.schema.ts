import { z } from 'zod';

export const ReviewSchema = z.object({
  review: z.string(),
  rating: z.number().int().min(1).max(5),
  coordinates: z.array(z.number()).min(2).max(2),
  ispId: z.number(),
});

const withId = z.object({ id: z.number() });
const ReviewWithId = ReviewSchema.merge(withId);

export const PartialReviewSchema = ReviewSchema.partial();
export type Review = z.infer<typeof ReviewWithId>;
export type CreateReviewDto = z.infer<typeof ReviewSchema>;
export type UpdateReviewDto = z.infer<typeof ReviewWithId>;
