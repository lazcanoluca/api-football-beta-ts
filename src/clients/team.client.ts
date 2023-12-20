import { BaseClient } from "../base_client";
import { ENDPOINTS } from "../constants";
import { Team } from "../models";

type TeamRequestParams = {};

export class TeamClient extends BaseClient {
  public async getTeams(params: Partial<TeamRequestParams>): Promise<Team[]> {
    return this.getEntityList<Team, Partial<TeamRequestParams>>(
      ENDPOINTS.TEAMS,
      params
    );
  }

  public async getTeamById(id: number): Promise<Team> {
    return this.getEntityById<Team>(ENDPOINTS.TEAMS, id);
  }
}
