export interface TestQuestion {
  title: string;
  content: string;
  tags: string[];
}

export const SAMPLE_QUESTIONS: TestQuestion[] = [
  {
    title: "How to user Reac hooks effectively",
    content:
      "I am learning React and want to understand how to use hooks properly. What are the best practices? What are the different state management patterns in React? When should I user Context vs Redux?",
    tags: ["react", "javascript", "hooks"],
  },
  {
    title: "React state management patterns",
    content: "What are the different state management patterns in React? When should I user Context vs Redux?",
    tags: ["react", "redux", "context", "state-management"],
  },
  {
    title: "Optimizing React performance with useMemo",
    content: "How can I optimize my React app performance using useMemo and useCallback? What are the gotchas?",
    tags: ["react", "performance", "usememo", "optimization"],
  },
];
