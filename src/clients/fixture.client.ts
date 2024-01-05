import { BaseClient } from "../base_client";
import { ENDPOINTS } from "../constants";
import { Fixture } from "../models/fixture";

type FixtureRequestParams = {
  team: number;
  next: number;
  date: string;
  from: string;
  id: number;
  league: number;
  live: string;
  round: string;
  last: number;
  status: string;
  season: number;
  timezone: string;
  to: string;
};

export class FixtureClient extends BaseClient {
  public async getFixtures(
    params: Partial<FixtureRequestParams>,
    cache?: {
      ttl?: number;
    }
  ): Promise<Fixture[]> {
    return this.getEntityList<Fixture, Partial<FixtureRequestParams>>(
      ENDPOINTS.FIXTURES,
      params,
      cache
    );
  }
}
