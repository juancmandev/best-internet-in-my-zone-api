import { z } from 'zod';

export const ReviewSchema = z.object({
  ispId: z
    .string({ required_error: 'ISP Id is required' })
    .trim()
    .min(1, 'ISP Id must be at least 1 character long'),
  rating: z.number({ required_error: 'Rating is required' }),
  review: z.string().optional(),
  coordinates: z.object({
    lat: z.number({ required_error: 'Latitude is required' }),
    lng: z.number({ required_error: 'Longitude is required' }),
  }),
});

const HasID = z.object({ id: z.string() });
const ReviewWithId = ReviewSchema.merge(HasID);

export const PartialReviewSchema = ReviewSchema.partial();
export type Review = z.infer<typeof ReviewWithId>;
export type CreateReviewDto = z.infer<typeof ReviewSchema>;
export type UpdateReviewDto = z.infer<typeof ReviewSchema>;
