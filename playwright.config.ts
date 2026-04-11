import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  globalSetup: "./tests/e2e/setup/global-setup.ts",
  globalTeardown: "./tests/e2e/setup/global-teardown.ts",
  fullyParallel: true,
  timeout: 60 * 1000,
  expect: {
    timeout: 30 * 1000,
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  outputDir: "test-results/",
  use: {
    baseURL: process.env.BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "setup-chromium",
      testMatch: "tests/e2e/setup/auth.chromium.setup.ts",
    },
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], storageState: "storage/user_chrome.json" },
      dependencies: ["setup-chromium"],
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],

  webServer: {
    command: "npm run start:test",
    url: process.env.BASE_URL,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});
