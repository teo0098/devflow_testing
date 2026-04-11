import { test, expect } from "@playwright/test";
import { BROWSER_USERS } from "../fixtures/users";

test.describe("Authentication Setup", () => {
  test("should authenticate a user via UI and persist the storage state", async ({ page }) => {
    await page.goto("/sign-in");
    await page.getByRole("textbox", { name: "Email Address" }).click();
    await page.getByRole("textbox", { name: "Email Address" }).fill(BROWSER_USERS.chrome.email);
    await page.getByRole("textbox", { name: "Password" }).click();
    await page.getByRole("textbox", { name: "Password" }).fill(BROWSER_USERS.chrome.password);
    await page.getByRole("button", { name: "Sign In" }).click();

    // Wait for session cookie to be set, then go to home
    await expect
      .poll(async () => {
        const cookies = await page.context().cookies();

        return cookies.some((c) =>
          [
            "next-auth.session-token",
            "__Secure-next-auth.session-token",
            "authjs.session-token",
            "__Secure-authjs.session-token",
          ].includes(c.name)
        );
      })
      .toBe(true);

    await page.goto("/");

    await page.context().storageState({ path: "storage/user_chrome.json" });
  });
});
