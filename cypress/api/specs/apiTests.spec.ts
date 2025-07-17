context("Context of the test", () => {
    beforeEach("Before hook", () => {
        // cy.request("", {});
    });

    it("Test body", () => {
        cy.fixture("test.fixture.json").then(
            (fixture) => {
                cy.request({
                    method: "GET",
                    url: `${Cypress.config('baseUrl')}/products`,
                    headers: {
                        // Authorization: `Bearer ${userToken}`,
                    },
                }).then((response) => {
                    expect(response.status).to.eq(200);
                });
            }
        );
    });
});