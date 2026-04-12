import ROUTES from "@/constants/routes";
import { test as base, expect, Page, BrowserContext } from "@playwright/test";

type QuestionFixture = {
  createQuestion: {
    questionId: string;
    title: string;
    page: Page;
  };
};

export const test = base.extend<QuestionFixture>({
  createQuestion: [
    async ({ browser }, use) => {
      const context: BrowserContext = await browser.newContext();
      const page = await context.newPage();

      await page.goto(ROUTES.ASK_QUESTION);
      await expect(page).toHaveURL(ROUTES.ASK_QUESTION);

      const questionTitle = `E2E Test Question ${Date.now()}`;
      const questionContent = `I am learning React and want to understand how to use hooks properly. 
        What are the best practices? What are the different state management patterns in React? When should I user Context vs Redux?`;
      const questionTags = "playwright";

      await page.getByRole("textbox", { name: "Question Title *" }).click();
      await page.getByRole("textbox", { name: "Question Title *" }).fill(questionTitle);
      await page.getByRole("textbox", { name: "editable markdown" }).click();
      await page.getByRole("textbox", { name: "editable markdown" }).fill(questionContent);
      await page.getByRole("textbox", { name: "Add tags..." }).click();
      await page.getByRole("textbox", { name: "Add tags..." }).fill(questionTags);
      await page.getByRole("textbox", { name: "Add tags..." }).press("Enter");
      await page.getByRole("button", { name: "Ask a question" }).click();

      await expect(page).toHaveURL(/\/questions\/[a-f0-9]+$/);
      const url = page.url();
      const questionId = url.split("/").pop();

      if (!questionId) {
        throw new Error("Failed to extract questionId from the URL");
      }

      await expect(page.getByRole("heading", { name: questionTitle, exact: true })).toBeVisible();

      await use({ questionId, title: questionTitle, page });

      await context.close();
    },
    { scope: "test" },
  ],
});
