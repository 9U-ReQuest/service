export const store = {
  data: {
    users: [
      {
        email: "user1@example.com",
        id: "1",
        name: "user1",
      },
      {
        email: "user2@example.com",
        id: "2",
        name: "user2",
      },
      {
        email: "user3@example.com",
        id: "3",
        name: "user3",
      },
    ],
  },
  getUsers: () => {
    return store.data.users;
  },
};
