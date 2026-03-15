import React from "react";

function ProfileInfo() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="max-w-xl">

      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <div className="flex items-center gap-5 mb-6">

        <img
          src={user?.avatar || "/default-avatar.png"}
          className="w-20 h-20 rounded-full"
        />

        <div>
          <h2 className="text-lg font-semibold">{user?.name}</h2>
          <p className="text-gray-500">{user?.email}</p>
        </div>

      </div>

      <div className="space-y-3">

        <p><b>Name:</b> {user?.name}</p>

        <p><b>Email:</b> {user?.email}</p>

        <p><b>Role:</b> {user?.role}</p>

      </div>

    </div>
  );
}

export default ProfileInfo;