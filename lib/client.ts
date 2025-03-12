import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import {RequestConfigParams} from '@/types';

class ApiSingleton {

  private static instance: ApiSingleton;
    private axiosInstance: AxiosInstance;
    private baseUrl: string = 'https://theaudiodb.com/api/v1/json/2';

    private constructor() {
        this.axiosInstance = axios.create({
            baseURL: this.baseUrl,
            timeout: 5000 // Default request timeout (5 seconds)
        });
    }

    public static getInstance(): ApiSingleton {
      if (!ApiSingleton.instance) {
          ApiSingleton.instance = new ApiSingleton();
      }
      return ApiSingleton.instance;
  }

  public async get<T>(endpoint: string, params?: AxiosRequestConfig<RequestConfigParams>): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(endpoint, params);
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(String(error));
      }
    }
  }

}

// Create a singleton instance
const apiClient = ApiSingleton.getInstance();

export default apiClient;

export { ApiSingleton };

// src/lib/api/endpoints.ts
export const endpoints = {
  searchArtist: '/search.php',
  artistDetails: '/artist.php',
  artistAlbum: '/album.php',
  artistTrack: '/track.php',
};
