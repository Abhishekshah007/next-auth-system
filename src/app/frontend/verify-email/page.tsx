"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function Page() {
  const [error, setError] = useState(false);
  const [token, setToken] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    const uriToken = window.location.search.split("=")[1];

    // decoding encoding
    const decodedToken = decodeURIComponent(uriToken || "");
    setToken(decodedToken || "");
    console.log(decodedToken);
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
      toast.error("Invalid Token", {
        position: "top-left",
      });
    }
  }, [token]);

  const verifyBtn = async () => {
    if (!token) {
      toast.error("Invalid Token", {
        position: "top-left",
      });
      return;
    }

    try {
      const response = await axios.post("/api/users/verifyEmail/", {
        token: token,
      });

      if (response.data.success) {
        toast.success("Account verified successfully", {
          position: "top-left",
        });
      } else {
        toast.error(response.data.message, {
          position: "top-left",
        });
      }
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-left",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {!buttonDisabled ? (
        <button className="bg-red-600 text-xl text-black" onClick={verifyBtn}>
          Verify My Account
        </button>
      ) : (
        <button disabled>Verify My Account</button>
      )}
    </div>
  );
}
