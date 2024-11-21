export const mockReviews = [
  {
    id: "review1",
    status: "DONE",
    scenarios: [
      { id: "scenario1", name: "Scenario 1", result: "GOOD" },
      { id: "scenario2", name: "Scenario 2", result: "NEUTRAL" },
    ],
    entries: [
      {
        name: "File Review",
        result: "GOOD",
        scenario: "Scenario 1",
        path: "/src/index.tsx",
        lineRange: "10-20",
        message: "Great implementation.",
      },
    ],
  },
];
