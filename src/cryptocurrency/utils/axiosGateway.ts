import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export async function axiosGateway(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<any>> {
  try {
    const response = await axios({
      ...config,
      method: config.method || 'GET',
      headers: {
        ...config.headers,
        accept: 'application/json',
        'x-cg-demo-api-key': process.env.COINGECKO_API_KEY,
      },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      console.error('Axios error:', error.response?.data);
      throw new Error(
        `Axios error: ${error.response?.status} - ${error.response?.statusText}`,
      );
    } else {
      // Handle other errors
      console.error('Unexpected error:', error);
      throw new Error('Unexpected error occurred');
    }
  }
}
