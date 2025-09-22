import { useCallback, useState } from 'react';

export default function useApiRequest(apiFunction) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // options: {onSuccess, onError}
  const execute = useCallback(
    async (params, { onSuccess, onError }) => {
      try {
        setIsLoading(true);
        setError(null); // 에러 상태 초기화
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await apiFunction(params);
        if (onSuccess) {
          onSuccess(response);
        }
      } catch (err) {
        setError(err);
        if (onError) {
          onError(err);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [apiFunction],
  );
  return {
    isLoading,
    error,
    execute,
  };
}
