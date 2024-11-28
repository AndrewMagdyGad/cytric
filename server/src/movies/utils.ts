import { z } from 'zod';

export const createMovieSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title cannot exceed 200 characters'),
  published_year: z
    .string()
    .refine(
      (val) => !isNaN(Number(val)),
      'Published year must be a valid number',
    ) // Check if it can be converted to a number
    .transform((val) => Number(val)) // Convert the string to a number
    .refine(
      (num) => Number.isInteger(num) && num >= 1888,
      'Published year must be 1888 or later',
    ),
});
