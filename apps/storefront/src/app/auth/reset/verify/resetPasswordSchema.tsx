import { z } from 'zod';
const passwordSchema = z.string()
  .min(6, 'Password must be at least 6 characters long')
  .refine((value) => /[A-Z]/.test(value), {
    message: 'Password must contain at least one uppercase letter',
  })
  .refine((value) => /\d/.test(value), {
    message: 'Password must contain at least one number',
  });

export const schema = z.object({
  password: passwordSchema,
  passwordConfirm: z.string().trim().min(1, { message: 'Password confirm is required' })
}).refine(data => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ['passwordConfirm'],
})
