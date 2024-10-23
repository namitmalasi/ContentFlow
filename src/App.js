import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";
import CreatePost from "./pages/CreatePost";
import { useEffect, useState } from "react";

function App() {
  // const { user } = useAuthState(auth);
  const [user, setUser] = useState(null); // To store the authenticated user
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Listen to Firebase authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // Set the user when logged in
      } else {
        setUser(null); // No user logged in
      }
      setLoading(false); // Stop loading once the check is complete
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  if (loading) {
    // Show a loading screen while Firebase is checking authentication
    return <div>Loading...</div>;
  }
  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-between">
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={user ? <Dashboard /> : <Login />} />
            <Route
              path="/signup"
              element={!user ? <SignUp /> : <Dashboard />}
            />
            <Route path="/login" element={!user ? <Login /> : <Dashboard />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/create-post"
              element={
                <PrivateRoute>
                  <CreatePost />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
