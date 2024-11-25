"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    securityQuestion: "",
    securityQuestionAnswer: "",
    gender: "",
    userName: "",
  });
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [butonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);

      if (user.password !== ConfirmPassword) {
        setError(true);
        toast.error("Password does not match", {
          position: "top-left",
        });
      }

      const response = await axios.post("/api/users/signup", user);
      console.log(response.data);

      toast.success("Registration Successful", {
        position: "top-left",
      });

      router.push("/frontend/login");

      setLoading(false);
    } catch (error: any) {
      setError(true);

      console.log(error.message);
      toast.error(error.message, {
        position: "top-left",
      });
    }
  }

  useEffect(() => {
    if (user.email && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center " style={{backgroundImage: "url('https://res.cloudinary.com/drrzakkgo/image/upload/v1732557970/ojlkghn2mphkf4a0p47h.jpg')", backgroundPosition: "center"}}>
      <ToastContainer />
      <div className="container max-w-lg mx-auto p-8  shadow-lg rounded-lg" style={{backgroundColor:"#f0ffff"}}>
        {loading ? (
          <h1 className="text-2xl font-bold text-blue-500 mb-6" id="header">
            Loading...
          </h1>
        ) : (
          <h1 className="text-2xl font-bold text-black mb-6" id="header">
            Registration
          </h1>
        )}
        {error && <p className="text-violet-500">{error}</p>}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            name="fullname"
            id="fullname"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={user.userName}
            onChange={(e) => setUser({ ...user, userName: e.target.value })}
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <input
            type="password"
            name="cpassword"
            id="cpassword"
            placeholder="Confirm your password"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={ConfirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <select
            name="gender"
            id="gender"
            className="w-full p-2 border text-black border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={user.gender}
            onChange={(e) => setUser({ ...user, gender: e.target.value })}
          >
            <option value="">Choose Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <select
            name="security questions"
            className="w-full p-2 border text-black border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={user.securityQuestion}
            onChange={(e) =>
              setUser({ ...user, securityQuestion: e.target.value })
            }
          >
            <option value="">Choose Security Question</option>
            <option value="What is your pet name?">
              What is your pet name?
            </option>
            <option value="What is your favourite food?">
              What is your favourite food?
            </option>
            <option value="What is your favourite color?">
              What is your favourite color?
            </option>
          </select>
          <input
            type="text"
            name="answer"
            id="answer"
            placeholder="Enter your answer"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            value={user.securityQuestionAnswer}
            onChange={(e) =>
              setUser({ ...user, securityQuestionAnswer: e.target.value })
            }
          />
          {butonDisabled ? (
            <button
              type="button"
              id="register-button"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
              disabled
            >
              Loading...
            </button>
          ) : (
            <button
              type="button"
              id="register-button"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
              onClick={handleSubmit}
            >
              Register
            </button>
          )}
          <p className="text-center text-gray-700">
            Already have an account?{" "}
            <Link
              href="/frontend/login"
              id="login"
              className="text-blue-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
