import React from "react";
import { useUser } from "../context/UserContext";

const UserDashboard = () => {
  const { currUser } = useUser();
  return (
    <div className="font-bold  ">
      <h1>Welcome to your dashboard, {currUser.email} </h1>

      <div className="flex flex-col">
        <form>
          
        </form>
      </div>
    </div>
  );
};

export default UserDashboard;
