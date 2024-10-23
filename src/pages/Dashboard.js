import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/create-post">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Create New Post
        </button>
      </Link>
    </div>
  );
};

export default Dashboard;
