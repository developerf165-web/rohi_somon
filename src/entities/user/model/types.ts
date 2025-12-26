export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  role: 'admin' | 'user';
}

export interface UserState {
  currentUser: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
