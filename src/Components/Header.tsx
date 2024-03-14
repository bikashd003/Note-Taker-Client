"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <>
      <div className="bg-yellow-400 p-4 flex justify-between">
        <h1 className="font-semibold font-abc text-xl">Note-Taker</h1>
        <h1 className="font-semibold font-abc text-xl" onClick={handleLogout}>
          Logout
        </h1>
      </div>
    </>
  );
};

export default Header;
