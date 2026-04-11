export interface TestUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

export const BROWSER_USERS: Record<string, TestUser> = {
  chrome: {
    name: "Chrome Test User",
    username: "chromeuser",
    email: "e2e-chrome@test.com",
    password: "password123",
  },
  firefox: {
    name: "Firefox Test User",
    username: "firefoxuser",
    email: "e2e-firefox@test.com",
    password: "password123",
  },
  safari: {
    name: "Safari Test User",
    username: "safariuser",
    email: "e2e-safari@test.com",
    password: "password123",
  },
};

export const COMMON_USERS: TestUser[] = [
  {
    name: "John Developer",
    username: "johndev",
    email: "e2e-johndev@test.com",
    password: "password123",
  },
  {
    name: "Sarah QA",
    username: "sarahqa",
    email: "e2e-sarahqa@test.com",
    password: "password123",
  },
  {
    name: "Sam Designer",
    username: "samdesigner",
    email: "e2e-samdesigner@test.com",
    password: "password123",
  },
];
