import { BaseClient } from "../base_client";
import { ENDPOINTS } from "../constants";
import { Team } from "../models";

type TeamRequestParams = {
  country: string;
  season: number;
  league: number;
  id: number;
  search: string;
  name: string;
};

export class TeamClient extends BaseClient {
  public async getTeams(
    params: Partial<TeamRequestParams>,
    cache?: {
      ttl?: number;
    }
  ): Promise<Team[]> {
    return this.getEntityList<Team, Partial<TeamRequestParams>>(
      ENDPOINTS.TEAMS,
      params,
      cache
    );
  }

  public async getTeamById(
    id: number,
    cache?: {
      ttl?: number;
    }
  ): Promise<Team> {
    return this.getEntityById<Team>(ENDPOINTS.TEAMS, id, cache);
  }
}
