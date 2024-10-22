// src/pages/Home.js
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import Auth from "../components/Auth";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {user ? (
        <>
          <h1>Welcome, {user.displayName}!</h1>
          <button onClick={() => auth.signOut()}>Sign Out</button>
        </>
      ) : (
        <Auth />
      )}
    </div>
  );
};

export default Home;
