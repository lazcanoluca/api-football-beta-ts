import { beforeAll, describe, expect, expectTypeOf, it } from "vitest";
import { ApiFootballResponse, BaseClient } from "../base_client";
import { ENDPOINTS } from "../constants";
import { League } from "../models";
import "dotenv/config";

describe("Base Client", () => {
    let client: BaseClient;
    beforeAll(() => {
        client = new BaseClient({ api_key: process.env.RAPID_API_KEY || "" });
    });

    it("checks if the base client instantiates correctly", () => {
        expectTypeOf(client).toMatchTypeOf<BaseClient>();
    });

    it("checks if it returns an entity given an endpoint and an id", async () => {
        const entity = await client.getEntityById<League>(
            ENDPOINTS.LEAGUES,
            61
        );

        expectTypeOf(entity).toMatchTypeOf<League>();
    });

    it.fails(
        "checks if it fails if getting an entity with a nonexistant id",
        async () => {
            await expect(
                client.getEntityById<League>(ENDPOINTS.LEAGUES, 999999)
            ).rejects;
        }
    );

    it("returns an entity list", async () => {
        const list = await client.getEntityList<League>(ENDPOINTS.LEAGUES);

        expectTypeOf(list).toMatchTypeOf<League[]>();
    });
});
