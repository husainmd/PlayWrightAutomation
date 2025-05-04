// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */

//export default defineConfig({
const config = ({
  testDir: './tests-new',

  // Below timeout is applicable to every step
  timeout: 60 * 1000,

  //This one is applicable only to assertions, default is 30 secs
  expect: {
    timeout: 5 * 1000,
  },
  reporter: "html",
  use: {
    browserName: "chromium",
    headless: false,
    screenshot: "on",
    trace: "on",
  },
  // projects: [
  //   {
  //     name: "chromium",
  //     use: {
  //       // 2 (Make sure device is not set)
  //       // ...devices["Desktop Chrome"],

  //       // 3
  //       viewport: null,
  //     },
  //   },
  // ],
});

module.exports = config;

