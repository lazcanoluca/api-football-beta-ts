import axios, { AxiosInstance } from "axios";

import { ENDPOINTS } from "./constants";
import {
    AxiosCacheInstance,
    buildWebStorage,
    setupCache,
} from "axios-cache-interceptor";

type Endpoint = (typeof ENDPOINTS)[keyof typeof ENDPOINTS];

export type ApiFootballResponse<TEntity, TParams> = {
    get: Endpoint;
    parameters: TParams;
    errors: [];
    results: number;
    response: TEntity[];
};

export type ClientConfig = {
    api_key: string;
    base_url?: string;
    base_host?: string;
};

export class BaseClient {
    protected axiosInstance: AxiosInstance;
    protected axiosInstanceWithCache: AxiosCacheInstance;
    protected config: ClientConfig;

    constructor(config: ClientConfig) {
        this.config = config;
        this.axiosInstance = axios.create({
            method: "GET",
            baseURL:
                this.config.base_url ||
                "https://api-football-beta.p.rapidapi.com",
            headers: {
                "X-RapidAPI-Key": this.config.api_key,
                "X-RapidAPI-Host":
                    this.config.base_host || "api-football-beta.p.rapidapi.com",
            },
        });
        this.axiosInstanceWithCache = setupCache(this.axiosInstance, {
            storage: buildWebStorage(localStorage),
        });
    }

    protected async getEntityById<TEntity>(
        endpoint: Endpoint,
        id: number,
        cache?: {
            ttl?: number;
        }
    ): Promise<TEntity> {
        return new Promise<TEntity>((resolve, reject) => {
            this.axiosInstanceWithCache
                .get<ApiFootballResponse<TEntity, { id: number }>>(endpoint, {
                    params: { id },
                    cache: cache ? cache : false,
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
        params: TParams,
        cache?: {
            ttl?: number;
        }
    ): Promise<TEntity[]> {
        return new Promise<TEntity[]>((resolve, reject) => {
            this.axiosInstanceWithCache
                .get<ApiFootballResponse<TEntity, TParams>>(endpoint, {
                    params: { ...params },
                    cache: cache ? cache : false,
                })
                .then((res) => resolve(res.data.response))
                .catch((err) => reject(err));
        });
    }
}
