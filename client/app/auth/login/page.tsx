"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/user");
    }
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    const response = axios
      .post("http://localhost:3001/auth/log-in", data)
      .then((res) => {
        console.log(res.status);
        if (res.status == 201) {
        }
        setMessage(`User logged In`);
        localStorage.setItem("token", res.data.jwtToken);
        router.push("/user");
      })
      .catch((err) => {
        reset();
        setMessage("Invalid Credentials");
      });
    // setMessage("Registration failed. Please try again.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Login In
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className={`w-full p-2 border border-gray-300 rounded mt-1 text-black ${errors.email ? "border-red-500" : ""}`}
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+\.\S+$/,
              })}
            />
            {errors.email && (
              <p className="text-red-500">A valid email is required.</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className={`w-full p-2 border border-gray-300 rounded mt-1 text-black ${errors.password ? "border-red-500" : ""}`}
              placeholder="Enter your password"
              {...register("password", { required: true, minLength: 8 })}
            />
            {errors.password && (
              <p className="text-red-500">
                Password must be at least 8 characters long.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            LogIn
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/auth/register" className="text-blue-500">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}
