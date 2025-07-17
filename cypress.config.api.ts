import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'https://fakestoreapi.com',
    specPattern: "**/*.spec.ts",
  },
  env: {
    omitFiltered: true,
    filterSpecs: true,
  }
});