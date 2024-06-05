"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  async function handleSubmit() {

    try {
      setLoading(true);

      const response = await axios.post("/api/users/login", user);

      console.log(response.data);

      toast.success("Registration Successful", {
        position: "top-left",
      });

      router.push("/frontend/dashboard");

      setLoading(false);
    } catch (error :any) {
      setError(error.message);

      console.log(error);

      toast.error(error.message, {
        position: "top-left",
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="container max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-blue-500 mb-6" id="header">
          Login
        </h1>
        {error && <p className="text-red-500">{error}</p>}
      
          <input
            type="email"
            id="email"
            placeholder="a@gmail.com"
            name="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <div className="flex items-center">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-gray-700">
              Remember me
            </label>
          </div>
          <button
            id="login-button"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
            onClick={handleSubmit}
            disabled={buttonDisabled}
          >
            Login
          </button>
        <a
          href="#"
          id="forgot"
          className="block text-center text-blue-500 mt-4 hover:underline"
        >
          Forget password?
        </a>
        <p className="text-center text-gray-700">
          Don&apos;t have an account?{" "}
          <Link href="/frontend/signup" id="register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}