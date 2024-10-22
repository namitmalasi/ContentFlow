import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/config";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Social login providers
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  // Handle email/password signup
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered");
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle Google login
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("Google sign in successful");
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle Facebook login
  const handleFacebookSignIn = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      console.log("Facebook sign in successful");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSignUp} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
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
          Sign Up
        </button>

        {/* Google Sign-in Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="bg-red-500 text-white py-2 px-4 mb-4 w-full"
        >
          Sign in with Google
        </button>

        {/* Facebook Sign-in Button */}
        <button
          type="button"
          onClick={handleFacebookSignIn}
          className="bg-blue-600 text-white py-2 px-4 w-full"
        >
          Sign in with Facebook
        </button>
      </form>
    </div>
  );
};

export default SignUp;
