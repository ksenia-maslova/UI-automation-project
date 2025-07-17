context("Context of the test", () => {
  beforeEach("Before hook", () => {
    // cy.request("", {});
  });

  it("Get all products", () => {
    cy.request({
      method: "GET",
      url: `${Cypress.config("baseUrl")}/products`,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length(20);
    });
  });

  it("Get a single product", () => {
    cy.fixture("expectedProduct.json").then((expectedObj) => {
      cy.request({
        method: "GET",
        url: `${Cypress.config("baseUrl")}/products/1`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.equal(expectedObj);
      });
    });
  });

  it("Add a new product", () => {
    cy.request({
      method: "POST",
      url: `${Cypress.config("baseUrl")}/products`,
      body: {
        id: 0,
        title: "string",
        price: 0.1,
        description: "string",
        category: "string",
        image: "http://example.com",
      },
    }).then((response) => {
      console.log(response.body);
      expect(response.status).to.eq(200);
    });
  });

  it("Update a product", () => {
    cy.request({
      method: "PUT",
      url: `${Cypress.config("baseUrl")}/products/1`,
      body: {
        id: 0,
        title: "string",
        price: 0.1,
        description: "string",
        category: "string",
        image: "http://example.com",
      },
    }).then((response) => {
      console.log(response.body);
      expect(response.status).to.eq(200);
    });
  });
});
