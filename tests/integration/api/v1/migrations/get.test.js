import database from "infra/database";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await cleanDatabase();
});

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("GET to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");

  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});

describe("Environment variables", () => {
  it("should be running in development mode", () => {
    expect(process.env.NODE_ENV).not.toBe("test");
    expect(process.env.NODE_ENV).toBe("development");
  });

  it("should get env variables", () => {
    expect(process.env.POSTGRES_HOST).toBeDefined();
    expect(process.env.POSTGRES_PORT).toBeDefined();
    expect(process.env.POSTGRES_USER).toBeDefined();
  });
});
