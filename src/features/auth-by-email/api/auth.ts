import type { LoginResponse } from '../model/types';

/**
 * Authentication API services
 */
export const authApi = {
  /**
   * Login with email and password
   * Currently simulated with a delay and mock data
   */
  async login(email: string, _password: string): Promise<LoginResponse> {
    // Simulated network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock successful response
    // In a real app, this would use the apiClient: 
    // const response = await apiClient.post<LoginResponse>('/auth/login', { email, password });
    
    
    return {
      user: {
        id: '1',
        email: email,
        role: 'admin',
        firstName: 'Admin',
        lastName: 'User',
      },
      token: 'mock_jwt_token_for_' + email,
    };
  },

  /**
   * Logout from the session
   */
  async logout(): Promise<void> {
    // In a real app: await apiClient.post('/auth/logout');
    return Promise.resolve();
  }
};
