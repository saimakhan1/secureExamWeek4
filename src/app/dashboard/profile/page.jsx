"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import {
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaLock,
  FaCamera,
} from "react-icons/fa";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newName, setNewName] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);

  if (status === "loading") {
    return (
      <div className="p-6 mt-20 text-center text-teal-700">
        Loading profile...
      </div>
    );
  }

  if (!session) return null;

  // --- Image handlers ---
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSaveImage = async () => {
    if (!selectedImage) return;
    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      const uploadRes = await fetch("/api/upload-profile", {
        method: "POST",
        body: formData,
      });
      const data = await uploadRes.json();
      if (!data.url) return alert("Upload failed");

      const updateRes = await fetch("/api/update-user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: data.url }),
      });
      const updateData = await updateRes.json();
      if (updateData.error) return alert(updateData.error);

      session.user.image = data.url;
      setPreview(null);
      setSelectedImage(null);
      alert("Profile image updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  // --- Name handlers ---
  const handleSaveName = async () => {
    if (!newName) return alert("Name cannot be empty");
    try {
      const res = await fetch("/api/update-user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      const data = await res.json();
      if (data.error) return alert(data.error);

      session.user.name = newName;
      setIsEditingName(false);
      alert("Name updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Error updating name");
    }
  };

  // --- Password handler ---
  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) return alert("Fill both fields");

    try {
      const res = await fetch("/api/update-user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (data.error) return alert(data.error);

      setIsEditingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      alert("Password updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Error updating password");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-primary">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-teal-100 border-b border-teal-200">
          <h2 className="text-2xl font-bold text-teal-900 flex items-center gap-2">
            <FaUser /> My Profile
          </h2>

          {/* Profile Image */}
          <div className="relative">
            <Image
              src={preview || session.user.image || "/default-avatar.png"}
              alt="Profile"
              width={60}
              height={60}
              className="rounded-full border-2 border-teal-600 object-cover"
            />
            <label className="absolute -bottom-1 -right-1 bg-teal-600 text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-teal-700 flex items-center gap-1">
              <FaCamera />
              Edit
              <input
                type="file"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Save Image */}
          {selectedImage && (
            <button
              onClick={handleSaveImage}
              className="w-full px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold flex justify-center items-center gap-2"
            >
              <FaCamera /> Save Profile Picture
            </button>
          )}

          {/* Name */}
          <div className="bg-teal-50 p-4 rounded-xl flex justify-between items-center shadow-sm border border-teal-100">
            <div className="flex items-center gap-2">
              <FaUser className="text-teal-600" />
              <div>
                <p className="text-sm text-teal-600">Name</p>
                <p className="text-lg font-semibold text-teal-900">
                  {session.user.name}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsEditingName(!isEditingName);
                setNewName(session.user.name || "");
              }}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm"
            >
              Edit
            </button>
          </div>

          {isEditingName && (
            <div className="border rounded-xl p-4 space-y-3 bg-teal-50">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full border px-3 py-2 rounded-lg"
              />
              <button
                onClick={handleSaveName}
                className="w-full px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold"
              >
                Save Name
              </button>
            </div>
          )}

          {/* Email */}
          <div className="bg-teal-50 p-4 rounded-xl shadow-sm flex items-center gap-2 border border-teal-100">
            <FaEnvelope className="text-teal-600" />
            <div>
              <p className="text-sm text-teal-600">Email</p>
              <p className="text-lg font-semibold text-teal-900">
                {session.user.email}
              </p>
            </div>
          </div>

          {/* Role */}
          <div className="bg-teal-50 p-4 rounded-xl shadow-sm flex items-center gap-2 border border-teal-100">
            <FaUserShield className="text-teal-600" />
            <div>
              <p className="text-sm text-teal-600">Role</p>
              <p className="text-lg font-semibold text-teal-900">
                {session.user.role}
              </p>
            </div>
          </div>

          {/* Password */}
          <div className="bg-teal-50 p-4 rounded-xl shadow-sm flex justify-between items-center border border-teal-100">
            <div className="flex items-center gap-2">
              <FaLock className="text-teal-600" />
              <div>
                <p className="text-sm text-teal-600">Password</p>
                <p>Change your password</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditingPassword(!isEditingPassword)}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm"
            >
              Change
            </button>
          </div>

          {isEditingPassword && (
            <div className="border rounded-xl p-4 space-y-3 bg-teal-50">
              <div className="flex justify-between items-center gap-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3 py-1 text-sm bg-teal-200 rounded-lg"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <div className="flex justify-between items-center gap-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border px-3 py-2 rounded-lg"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3 py-1 text-sm bg-teal-200 rounded-lg"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <button
                onClick={handleChangePassword}
                className="w-full px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold"
              >
                Update Password
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
