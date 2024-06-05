"use client";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    email: "",
    userName: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function getUserData() {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/profile");
      const status = response.status;

      if (status === 200) {
        setData(response.data);
        setError("");
      } else {
        setError("Unexpected status code: " + status);
        toast.error("Failed to fetch profile data. Please try again.");
      }
    } catch (error:any) {
      setError(error.response ? error.response.data.message : error.message);
      toast.error(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      const response = await axios.get("/api/users/logout");
      if (response.status === 200) {
        toast.success("Logged out successfully");
        router.push("/frontend/login");
      } else {
        toast.error("Failed to log out. Please try again.", {
          position: "top-left",
          autoClose: 5000,
          
        });
      }
    } catch (error:any) {
      toast.error(error.response ? error.response.data.message : error.message);
    }
  }

  return (
    <div className="justify-center h-screen bg-gray-100 p-20">
      <ToastContainer  />
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <button
        onClick={logout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
      <hr />
      <button
        onClick={getUserData}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Profile Data
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <p>
          Name: {data.name} <br />
          Email: {data.email} <br />
          User Name: {data.userName} <br />
          Gender: {data.gender}
        </p>
      )}
    </div>
  );
}
