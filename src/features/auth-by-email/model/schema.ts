import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

export const loginZodSchema = zod.object({
  email: zod.string().min(1, 'E-mail is required').email('Invalid email format'),
  password: zod.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: zod.boolean().default(false),
});

export const loginSchema = toTypedSchema(loginZodSchema);

export type LoginFormValues = zod.infer<typeof loginZodSchema>;
