import { z } from 'zod';

export const IspSchema = z.object({
  name: z.string().nonempty(),
  urlImage: z.string(),
  availableIn: z.string(),
});

const withId = z.object({ id: z.number() });
const IspWithId = IspSchema.merge(withId);

export const PartialReviewSchema = IspSchema.partial();
export type Isp = z.infer<typeof IspWithId>;
export type CreateIspDto = z.infer<typeof IspSchema>;
export type UpdateIspDto = z.infer<typeof IspWithId>;
