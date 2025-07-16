# UI-automation-project

This repository provides an example of an end-to-end (E2E) test automation solution for a public web application, using [Cypress](https://www.cypress.io/) with [Cucumber](https://cucumber.io/) (Gherkin syntax) and TypeScript. It demonstrates best practices for structuring, writing, and running E2E tests in a maintainable and scalable way.

---

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Running Tests](#running-tests)
- [Configuration & Environment](#configuration--environment)
- [Continuous Integration](#continuous-integration)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- **Cypress** for fast, reliable browser automation
- **Cucumber (Gherkin)** for readable, behavior-driven test scenarios
- **TypeScript** for type safety and maintainability
- **Page Object Model** for reusable, organized test code
- **Fixtures** for mock data
- **GitHub Actions** for CI test execution

### Example Test Scenarios
- **ToDo List Functionality**: Add, remove, and complete ToDo items; mark all as completed
- **Sidebar Verification**: Check sidebar visibility, content, and links

---

## Project Structure
```
UI-automation-project/
├── cypress/
│   ├── features/           # Gherkin feature files (test scenarios)
│   ├── fixtures/           # Test data and mocks
│   ├── pages/              # Page Object Model classes
│   ├── support/
│   │   ├── commands.ts     # (Custom Cypress commands)
│   │   ├── e2e.ts          # Cypress support file
│   │   └── step_definitions/ # Step definitions for Gherkin steps
│   └── tsconfig.json       # TypeScript config for Cypress
├── cypress.config.ts       # Cypress configuration
├── package.json            # Project metadata and scripts
├── .github/workflows/      # CI configuration
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
   - Define `CYPRESS_BASE_URL` in `.env`:
     ```env
     CYPRESS_BASE_URL=https://your-app-url.com
     ```

---

## Running Tests

### Open Cypress Test Runner (GUI)
```sh
npm run open:cypress
```

### Run All Tests in Headless Mode
```sh
npm run cy:run
```

- Test specs are written in Gherkin (`.feature` files) and mapped to step definitions in `cypress/support/step_definitions/`.
- Page objects are in `cypress/pages/` for maintainable selectors and actions.

---

## Configuration & Environment
- **Cypress config:** See `cypress.config.ts` for custom setup, including Cucumber preprocessor and esbuild integration.
- **TypeScript:** Configured via `cypress/tsconfig.json`.
- **Environment variables:**
  - `CYPRESS_BASE_URL` (required): The base URL for the application under test.
  - Use a `.env` file (not committed) for local development.

---

## Continuous Integration
- **GitHub Actions**: Automated test runs on every push to `main` (see `.github/workflows/main.yml`).
- The CI workflow:
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
This project is licensed under the [Apache License 2.0](LICENSE).
