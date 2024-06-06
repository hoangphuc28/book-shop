import { z } from 'zod';

export const reviewSchema = z.object({
  content: z.string().trim().min(1, { message: 'Content is required' }),
  rating: z.string().regex(/^\d$/).min(1, { message: 'Rating must be at least 1' }).max(5, { message: 'Rating cannot be greater than 5' })
});
