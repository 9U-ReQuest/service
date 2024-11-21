export const mockSubmissions = [
  {
    id: "submission1",
    assignment_id: "assignment1",
    status: "STARTED",
    lastUpdated: new Date().toISOString(),
    expiredAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];
