const request = require("supertest");
const app = require("../server");

describe("REST endpoint", () => {
  test("GET /rest/getAllUsers returns 200 and an array of users", async () => {
    const res = await request(app).get("/rest/getAllUsers");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty("id");
    expect(res.body[0]).toHaveProperty("firstName");
  });
});

describe("GraphQL endpoint", () => {
  test("getAllUsers query returns the user list", async () => {
    const query = `
      query {
        getAllUsers {
          id
          firstName
          lastName
        }
      }
    `;
    const res = await request(app).post("/graphql").send({ query });
    expect(res.statusCode).toBe(200);
    expect(res.body.errors).toBeUndefined();
    expect(Array.isArray(res.body.data.getAllUsers)).toBe(true);
    expect(res.body.data.getAllUsers.length).toBeGreaterThan(0);
  });

  test("findUserById returns the matching user", async () => {
    const query = `
      query {
        findUserById(id: 1) {
          id
          firstName
        }
      }
    `;
    const res = await request(app).post("/graphql").send({ query });
    expect(res.statusCode).toBe(200);
    expect(res.body.errors).toBeUndefined();
    expect(res.body.data.findUserById.id).toBe(1);
  });

  test("createUser mutation returns the submitted fields", async () => {
    const mutation = `
      mutation {
        createUser(
          firstName: "Test"
          lastName: "User"
          email: "test.user@example.com"
          password: "secret"
        ) {
          firstName
          lastName
          email
        }
      }
    `;
    const res = await request(app).post("/graphql").send({ query: mutation });
    expect(res.statusCode).toBe(200);
    expect(res.body.errors).toBeUndefined();
    expect(res.body.data.createUser).toEqual({
      firstName: "Test",
      lastName: "User",
      email: "test.user@example.com",
    });
  });
});