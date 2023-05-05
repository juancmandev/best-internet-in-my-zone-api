import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ReviewSchema } from '../schemas/review.schema';
import { IspSchema } from '../schemas/isp.schema';

const validate = (
  schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>
) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync(req.body);

    next();
  } catch (error) {
    let err = error;

    if (err instanceof z.ZodError)
      err = err.issues.map((e) => ({ path: e.path[0], message: e.message }));

    return res.status(409).json({
      status: 'failed',
      error: err,
    });
  }
};

export const validateReviewCreate = validate(ReviewSchema);
export const validateIspCreate = validate(IspSchema);
