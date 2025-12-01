import React, { useState } from "react";
import { User, Lock, Upload, Save, X } from "lucide-react";
import placeholder from "/placeholderProfile.webp";

function Profile() {
  const [fileName, setFileName] = useState("");
  const handleDelete = () => {
    setFileName("");
  };
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
            <p className="text-gray-600">
              Manage your account settings and preferences.
            </p>
          </div>

          {/* Profile Information Section */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-gray-700" />
              <h2 className="text-xl font-semibold text-gray-900">
                Profile Information
              </h2>
            </div>

            {/* Profile Picture */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Profile Picture
              </label>
              <div className="flex items-center gap-4">
                <img
                  src={placeholder}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 cursor-pointer">
                    <Upload className="w-4 h-4" />
                    Upload New Photo
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) setFileName(file.name);
                      }}
                    />
                  </label>

                  {fileName && (
                    <div className="flex items-center justify-between text-xs text-gray-700 px-3 py-2 bg-gray-100 border border-gray-200 rounded-md">
                      <span className="truncate max-w-[200px]">{fileName}</span>

                      <button
                        onClick={handleDelete}
                        className="cursor-pointer ml-2 text-gray-500 hover:text-red-500 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Full Name */}
            <div className="mb-6">
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                placeholder="Enter your Fullname"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Email Address */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Save Button */}
            <button className="cursor-pointer flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>

          {/* Change Password Section */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-6">
              <Lock className="w-5 h-5 text-gray-700" />
              <h2 className="text-xl font-semibold text-gray-900">
                Change Password
              </h2>
            </div>

            {/* Current Password */}
            <div className="mb-6">
              <label
                htmlFor="current"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Current Password
              </label>
              <input
                id="current"
                type="password"
                placeholder="Enter your Current Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* New Password */}
            <div className="mb-6">
              <label
                htmlFor="newpass"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                New Password
              </label>
              <input
                id="newpass"
                type="password"
                placeholder="Enter your New password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Confirm New Password */}
            <div className="mb-6">
              <label
                htmlFor="confirm"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm New Password
              </label>
              <input
                id="confirm"
                type="password"
                placeholder="Enter Your Confirm Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Update Password Button */}
            <button className="cursor-pointer flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800">
              <Lock className="w-4 h-4" />
              Update Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
