/// <reference types="cypress" />
import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Ensure CYPRESS_BASE_URL is set
if (!process.env.CYPRESS_BASE_URL) {
  throw new Error("CYPRESS_BASE_URL is not set in environment variables.");
}

export default defineConfig({
  e2e: {
    // Use baseUrl from environment, fail early if not set
    baseUrl: process.env.CYPRESS_BASE_URL,
    // Restrict specPattern to only features in the cypress/features directory
    specPattern: "cypress/features/**/*.feature",
    env: {
      omitFiltered: true,
      filterSpecs: true,
    },
    // Setup plugins and preprocessors
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      try {
        await addCucumberPreprocessorPlugin(on, config);
        on(
          "file:preprocessor",
          createBundler({
            plugins: [createEsbuildPlugin(config)],
          })
        );
      } catch (err) {
        console.error("Failed to set up plugins:", err);
        throw err;
      }
      return config;
    },
  },
});
