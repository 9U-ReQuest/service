export const mockUser = {
  id: "user1",
  name: "John Doe",
  email: "john.doe@example.com",
  providers: {
    kakao: {
      uid: "kakao123",
      connectedAt: new Date().toISOString(),
    },
  },
  lastGeneratedAssignment: "assignment1",
  submissions: [],
  prompt: {
    fields: ["frontend", "backend"],
    techs: ["React", "Node.js"],
    companies: ["Company A", "Company B"],
  },
};
