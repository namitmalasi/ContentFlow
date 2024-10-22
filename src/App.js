import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";

function App() {
  const { user } = useAuthState(auth);
  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-between">
        <main className="flex-grow p-4">
          <Routes>
            <Route path="/" element={user ? <Dashboard /> : <Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <PrivateRoute path="/dashboard" component={Dashboard} />
        </main>
      </div>
    </Router>
  );
}

export default App;
