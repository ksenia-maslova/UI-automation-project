let concertId;
let adminToken;

function generateConcertData() {
  return {
    name: `Test concert ${Date.now()}`,
    location: "Test Location",
    ticket_price: 30,
    date: "2024-07-10"
  };
}

before(() => {
  getUserToken("admin", "admin").then((token) => {
    adminToken = token;
  });
});

context("Context of the test", () => {
  beforeEach("Before hook", () => {
    // cy.request("", {});
  });

  it("Get all concerts", () => {
    cy.request({
      method: "GET",
      url: `${Cypress.config("baseUrl")}/concerts`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length(5);
    });
  });

  it("Get concert by id", () => {
    cy.fixture("concert.data.json").then((expectedObj) => {
      cy.request({
        method: "GET",
        url: `${Cypress.config("baseUrl")}/concerts/1`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.equal(expectedObj);
      });
    });
  });

  it("Insert concert data", () => {
    const concertData = generateConcertData();
    cy.request({
      method: "POST",
      url: `${Cypress.config("baseUrl")}/concerts`,
      body: concertData,
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.success).to.eq(true);
      expect(typeof response.body.id).to.eq("number");
      concertId = response.body.id;
      // Verify the concert was created with correct data
      cy.request({
        method: "GET",
        url: `${Cypress.config("baseUrl")}/concerts/${concertId}`
      }).then((getResp) => {
        expect(getResp.status).to.eq(200);
        expect(getResp.body[0].name).to.eq(concertData.name);
        expect(getResp.body[0].location).to.eq(concertData.location);
        expect(getResp.body[0].ticket_price).to.eq(concertData.ticket_price);
        expect(getResp.body[0].date).to.eq(concertData.date);
      });
    });
  });
});

afterEach(() => {
  if (concertId) {
    cy.request({
      method: "DELETE",
      url: `${Cypress.config("baseUrl")}/concerts/${concertId}`,
      headers: { Authorization: `Bearer ${adminToken}` },
      failOnStatusCode: false
    });
    concertId = undefined;
  }
});

function getUserToken(username, password) {
  return cy.request({
    method: "POST",
    url: `${Cypress.config("baseUrl")}/login`,
    body: {
      username,
      password
    }
  }).then((response) => {
    if (response.status !== 200) {
      throw new Error("Can't login with provided credentials");
    }
    return response.body.token;
  });
}
