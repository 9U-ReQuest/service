export const mockAssignments = [
  {
    id: "assignment1",
    name: "Frontend Challenge",
    description: "Build a responsive web page.",
    readme: "# Instructions\nComplete the task within 3 days.",
    prompt: {
      fields: ["frontend"],
      techs: ["React"],
      companies: ["Tech Corp"],
    },
    status: "READY",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "assignment2",
    name: "Backend Challenge",
    description: "Implement an API.",
    readme: "# Instructions\nBuild and document the API.",
    prompt: {
      fields: ["backend"],
      techs: ["Node.js"],
      companies: ["Code Inc."],
    },
    status: "READY",
    lastUpdated: new Date().toISOString(),
  },
];
