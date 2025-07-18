import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001',
    specPattern: "**/*.spec.ts",
  },
  env: {
    omitFiltered: true,
    filterSpecs: true,
  }
});