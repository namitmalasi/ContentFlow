import React, { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/dashboard");
      }
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, [navigate]);

  // Social login providers
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  // Handle email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in");
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google sign-in successful:", result.user); // Debugging log

      // Directly navigate to the dashboard after successful sign-in
      if (result.user) {
        navigate("/dashboard"); // Programmatic navigation
      }
    } catch (error) {
      console.error("Google login failed:", error); // Error logging
      setError("Google login failed. Please try again.");
    }
  };

  // Handle Facebook login
  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      console.log("Facebook sign-in successful:", result.user); // Debugging log

      // Directly navigate to the dashboard after successful sign-in
      if (result.user) {
        navigate("/dashboard"); // Programmatic navigation
      }
    } catch (error) {
      console.error("Facebook login failed:", error); // Error logging
      setError("Facebook login failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 w-full mb-4"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 w-full mb-4"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 mb-4">
          Login
        </button>

        {/* Google Sign-in Button */}
        <button
          type="submit"
          onClick={handleGoogleLogin}
          className="bg-red-500 text-white py-2 px-4 mb-4 w-full"
        >
          Sign in with Google
        </button>

        {/* Facebook Sign-in Button */}
        <button
          type="submit"
          onClick={handleFacebookLogin}
          className="bg-blue-600 text-white py-2 px-4 w-full"
        >
          Sign in with Facebook
        </button>
      </form>
    </div>
  );
};

export default Login;
