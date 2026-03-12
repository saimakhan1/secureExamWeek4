"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    theme: "light",
    emailNotifications: true,
    examReminders: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Settings:", formData);

    // TODO: Call API here
    alert("Settings saved successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto mt-20">
      <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-6">
        General Settings
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Section */}
        <div className="card bg-base-100 shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Profile Information</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">Full Name</label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="label">Profile Image</label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
            />
          </div>
        </div>

        {/* Theme Section */}
        <div className="card bg-base-100 shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Appearance</h3>

          <select
            name="theme"
            value={formData.theme}
            onChange={handleChange}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System Default</option>
          </select>
        </div>

        {/* Notifications Section */}
        <div className="card bg-base-100 shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Notifications</h3>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Email Notifications</span>
              <input
                type="checkbox"
                name="emailNotifications"
                className="toggle toggle-primary"
                checked={formData.emailNotifications}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="form-control mt-3">
            <label className="label cursor-pointer">
              <span className="label-text">Exam Reminders</span>
              <input
                type="checkbox"
                name="examReminders"
                className="toggle toggle-primary"
                checked={formData.examReminders}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>

        {/* Password Section */}
        <div className="card bg-base-100 shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Change Password</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="password"
              placeholder="Current Password"
              className="input input-bordered w-full"
            />

            <input
              type="password"
              placeholder="New Password"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="text-right">
          <button
            type="submit"
            className="btn bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
