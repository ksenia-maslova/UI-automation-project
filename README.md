# UI-automation-project

This repository provides an example of an end-to-end (E2E) and API test automation solution for a public web application, using [Cypress](https://www.cypress.io/) with [Cucumber](https://cucumber.io/) (Gherkin syntax) and TypeScript. It demonstrates best practices for structuring, writing, and running E2E and API tests in a maintainable and scalable way.

---

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Running UI Tests](#running-ui-tests)
- [Running API Tests](#running-api-tests)
- [Configuration & Environment](#configuration--environment)
- [Fixtures](#fixtures)
- [Page Object Model](#page-object-model)
- [Step Definitions](#step-definitions)
- [Continuous Integration](#continuous-integration)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- **Cypress** for fast, reliable browser and API automation
- **Cucumber (Gherkin)** for readable, behavior-driven test scenarios
- **TypeScript** for type safety and maintainability
- **Page Object Model** for reusable, organized test code
- **Fixtures** for mock data
- **API Testing** with Cypress
- **Custom Step Definitions** for BDD
- **Multiple Cypress Configurations** for UI and API
- **GitHub Actions** for CI test execution (if configured)

### Example Test Scenarios
- **ToDo List Functionality:** Add, remove, and complete ToDo items; mark all as completed
- **Sidebar Verification:** Check sidebar visibility, content, and links
- **API Testing:** Validate API endpoints (e.g., GET /products)

---

## Project Structure
```
UI-automation-project/
├── cypress/
│   ├── api/
│   │   └── specs/            # API test specs (TypeScript)
│   ├── features/             # Gherkin feature files (test scenarios)
│   ├── fixtures/             # Test data and mocks (JSON)
│   ├── pages/                # Page Object Model classes (TypeScript)
│   ├── support/
│   │   ├── commands.ts       # (Custom Cypress commands)
│   │   ├── e2e.ts            # Cypress support file
│   │   └── step_definitions/ # Step definitions for Gherkin steps
│   └── tsconfig.json         # TypeScript config for Cypress
├── cypress.config.ts         # Cypress configuration (UI)
├── cypress.config.api.ts     # Cypress configuration (API)
├── package.json              # Project metadata and scripts
├── .github/workflows/        # CI configuration (if present)
└── ...
```

---

## Setup & Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/ksenia-maslova/UI-automation-project.git
   cd UI-automation-project
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the project root (see `.gitignore`).
   - Define `CYPRESS_BASE_URL` in `.env` for UI tests:
     ```env
     CYPRESS_BASE_URL=https://your-app-url.com
     ```
   - For API tests, the base URL is set in `cypress.config.api.ts` (default: `https://fakestoreapi.com`).

---

## Running UI Tests

### Open Cypress Test Runner (GUI)
```sh
npm run open:cypress:ui
```

### Run All UI Tests in Headless Mode
```sh
npm run cy:run:ui
```
- UI test specs are written in Gherkin (`.feature` files) and mapped to step definitions in `cypress/support/step_definitions/`.
- Page objects are in `cypress/pages/` for maintainable selectors and actions.

---

## Running API Tests

### Open Cypress Test Runner for API (GUI)
```sh
npm run open:cypress:api
```

### Run All API Tests in Headless Mode
```sh
npm run cy:run:api
```
- API test specs are located in `cypress/api/specs/` and use Cypress’s `cy.request` for HTTP calls.
- The default API base URL is `https://fakestoreapi.com` (see `cypress.config.api.ts`).
- Example API test:
  ```typescript
  it("Test body", () => {
    cy.fixture("test.fixture.json").then((fixture) => {
      cy.request({
        method: "GET",
        url: `${Cypress.config('baseUrl')}/products`,
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
  ```

---

## Configuration & Environment
- **Cypress config:**
  - `cypress.config.ts` for UI tests (uses `CYPRESS_BASE_URL` from `.env`)
  - `cypress.config.api.ts` for API tests (default base URL is hardcoded)
- **TypeScript:** Configured via `cypress/tsconfig.json`.
- **Environment variables:**
  - `CYPRESS_BASE_URL` (required for UI): The base URL for the application under test.
  - Use a `.env` file (not committed) for local development.

---

## Fixtures
- Located in `cypress/fixtures/` (e.g., `test.fixture.json`).
- Used for providing test data to both UI and API tests.

---

## Page Object Model
- **ToDoPage:** Encapsulates selectors and actions for the ToDo list page (`cypress/pages/ToDoPage.ts`).
- **SideMenu:** Encapsulates selectors and actions for the sidebar (`cypress/pages/SideMenu.ts`).
- Promotes maintainability and reusability in step definitions and tests.

---

## Step Definitions
- Located in `cypress/support/step_definitions/`.
- **toDoPage.ts:** Steps for adding, removing, and completing ToDo items.
- **sideMenu.ts:** Steps for verifying sidebar visibility, content, and links.
- **keyboardIteraction.ts:** Steps for simulating keyboard events (e.g., pressing Enter or Esc).
- **navigation.ts:** Steps for navigating to the application start page.
- Step definitions are mapped to Gherkin steps in feature files.

---

## Continuous Integration
- **GitHub Actions**: Automated test runs on every push to `main` (if configured in `.github/workflows/`).
- The CI workflow (if present):
  - Installs dependencies
  - Runs all Cypress tests in headless mode
  - Uses the `CYPRESS_BASE_URL` secret for environment configuration

---

## Contributing
Contributions are welcome! Please:
- Fork the repository and create a feature branch
- Follow the existing code style and structure
- Write clear, readable Gherkin scenarios and step definitions
- Add or update tests as appropriate
- Open a pull request with a clear description

For issues or feature requests, use the [GitHub Issues](https://github.com/ksenia-maslova/UI-automation-project/issues) page.

---

## License
This project is licensed under the [ISC License](LICENSE).
