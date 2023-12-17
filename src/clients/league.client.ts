import { BaseClient } from "../base_client";
import { ENDPOINTS } from "../constants";
import { League } from "../models";

type LeagueRequestParams = {
  country: string;
  id: number;
  code: string;
  season: string;
  current: string;
  team: number;
  search: string;
  name: string;
  type: string;
  last: number;
};

export class LeagueClient extends BaseClient {
  public async getLeagues(
    params: Partial<LeagueRequestParams>
  ): Promise<League[]> {
    return this.getEntityList<League, Partial<LeagueRequestParams>>(
      ENDPOINTS.LEAGUES,
      params
    );
  }

  public async getLeagueById(id: number): Promise<League> {
    return this.getEntityById<League>(ENDPOINTS.LEAGUES, id);
  }
}
