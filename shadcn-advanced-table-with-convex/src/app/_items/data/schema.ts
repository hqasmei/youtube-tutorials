import { z } from 'zod';

export const personSchema = z.object({
  _id: z.string(),
  image: z.optional(z.string()),
  fullname: z.string(),
  birthday: z.string(),
});

export type Person = z.infer<typeof personSchema>;
