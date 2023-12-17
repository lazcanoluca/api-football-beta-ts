import axios, { AxiosInstance } from "axios";
import "dotenv/config";

import { ENDPOINTS } from "./constants";

type Endpoint = (typeof ENDPOINTS)[keyof typeof ENDPOINTS];

export type ApiFootballResponse<TEntity, TParams> = {
  get: Endpoint;
  parameters: TParams;
  errors: [];
  results: number;
  response: TEntity[];
};

export class BaseClient {
  protected axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      method: "GET",
      baseURL: "https://api-football-beta.p.rapidapi.com",
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        "X-RapidAPI-Host": "api-football-beta.p.rapidapi.com",
      },
    });
  }

  protected async getEntityById<TEntity>(
    endpoint: Endpoint,
    id: number
  ): Promise<TEntity> {
    return new Promise<TEntity>((resolve, reject) => {
      this.axiosInstance
        .get<ApiFootballResponse<TEntity, { id: number }>>(endpoint, {
          params: { id },
        })
        .then((res) => {
          if (res.data.results > 0) {
            resolve(res.data.response[0]);
          } else {
            reject(); // TODO: custom exceptions handling module
          }
        })
        .catch((err) => reject(err));
    });
  }

  protected async getEntityList<TEntity, TParams extends {} = never>(
    endpoint: Endpoint,
    params?: TParams
  ): Promise<TEntity[]> {
    return new Promise<TEntity[]>((resolve, reject) => {
      this.axiosInstance
        .get<ApiFootballResponse<TEntity, TParams>>(endpoint, {
          params: { ...params },
        })
        .then((res) => resolve(res.data.response))
        .catch((err) => reject(err));
    });
  }
}
