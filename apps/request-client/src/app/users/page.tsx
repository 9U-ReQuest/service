"use client";

import { useGetUsers } from "@/shared/api/client";

const UserPage = () => {
  const users = useGetUsers();

  if (users.isLoading) return <h1>Loading...</h1>;

  return (
    <div className="space-y-4">
      {users.data?.map((user) => (
        <div key={user.id}>
          <h1>name: {user.name}</h1>
          <p style={{ color: "gray" }}>email: {user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default UserPage;
