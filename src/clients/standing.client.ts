import { Standing } from "../models";
import { BaseClient } from "../base_client";
import { ENDPOINTS } from "../constants";

type StandingRequestParams = {
    team?: number;
    season: number;
    league?: number;
};

export class StandingClient extends BaseClient {
    public async getStandings(
        params: StandingRequestParams,
        cache?: {
            ttl?: number;
        }
    ): Promise<Standing[]> {
        return this.getEntityList<Standing, StandingRequestParams>(
            ENDPOINTS.FIXTURES,
            params,
            cache
        );
    }
}
