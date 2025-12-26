import type { User } from '@/entities/user';

export interface LoginResponse {
  user: User;
  token: string;
}
