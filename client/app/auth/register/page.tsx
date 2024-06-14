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
      router.push("/user"); // Redirect to /user if token exists
    }
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    const response = axios
      .post("http://localhost:3001/user/sign-up", data)
      .then((res) => {
        console.log(res.status);
        if (res.status == 201) {
        }
        setMessage(`User ${res.data.user} registered successfully.`);
      })
      .catch((err) => {
        reset();
        setMessage("Email already exists");
      });
    // setMessage("Registration failed. Please try again.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              className={`w-full p-2 border border-gray-300 rounded mt-1 text-black ${errors.firstName ? "border-red-500" : ""}`}
              placeholder="Enter your first name"
              {...register("firstName", { required: true, maxLength: 15 })}
            />
            {errors.firstName && (
              <p className="text-red-500">
                First Name is required and should be less than 15 characters.
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              className={`w-full p-2 border border-gray-300 rounded mt-1 text-black ${errors.lastName ? "border-red-500" : ""}`}
              placeholder="Enter your last name"
              {...register("lastName", { required: true, maxLength: 20 })}
            />
            {errors.lastName && (
              <p className="text-red-500">
                Last Name is required and should be less than 20 characters.
              </p>
            )}
          </div>
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
            Sign Up
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/auth/login" className="text-blue-500">
            Already registered?
          </a>
        </p>
      </div>
    </div>
  );
}
