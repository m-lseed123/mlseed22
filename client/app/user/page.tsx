"use client";
import { redirect, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const IndexPage = () => {
  const router = useRouter();
  const [user, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const subMit = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3001/user/info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    router.push("/auth/login");
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-80 mx-auto mt-8">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2 text-black">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-600 mb-2">{user.email}</p>
          <p className="text-gray-500 text-sm">
            Joined: {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={subMit}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default IndexPage;
