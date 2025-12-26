export interface AppError {
  message: string;
  code?: string;
  status?: number;
}

/**
 * Standard interface for the error object thrown by our apiClient
 */
interface ApiErrorResponse {
  response: Response;
  data: any;
}

/**
 * Translates various error types into a standardized AppError format.
 * Now works with native Fetch API responses.
 */
export const handleApiError = (error: unknown): AppError => {
  // Check if it's our custom ApiErrorResponse from fetch
  if (error && typeof error === 'object' && 'response' in error && 'data' in error) {
    const err = error as ApiErrorResponse;
    const status = err.response.status;
    const data = err.data;

    // Custom backend error messages usually come in data.message
    if (data?.message) {
      return {
        message: data.message,
        code: data.code,
        status,
      };
    }

    // fallback messages for common status codes
    switch (status) {
      case 400:
        return { message: 'Некорректный запрос (400)', status };
      case 401:
        return { message: 'Ошибка авторизации. Пожалуйста, войдите снова.', status };
      case 403:
        return { message: 'Доступ запрещен (403)', status };
      case 404:
        return { message: 'Ресурс не найден (404)', status };
      case 500:
        return { message: 'Внутренняя ошибка сервера (500)', status };
      default:
        // Attempt to use statusText or generic message
        return { 
          message: err.data?.error || err.response.statusText || 'Произошла ошибка при запросе', 
          status 
        };
    }
  }

  // Handle generic network or JS errors
  if (error instanceof Error) {
    // Fetch throws a TypeError on network failure
    if (error.name === 'TypeError') {
      return { message: 'Ошибка сети. Проверьте интернет-соединение.' };
    }
    return { message: error.message };
  }

  return { message: 'Произошла неизвестная ошибка' };
};
