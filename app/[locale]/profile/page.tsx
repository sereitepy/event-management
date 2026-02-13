"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { logout } from "@/lib/api/logout";
import {
  getCurrentUserProfile,
  updateUserProfileById,
  type UserProfile,
  type UpdateProfileRequest,
} from "@/lib/api/user-profile-feature";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(true);

  const [formData, setFormData] = useState<UpdateProfileRequest>({
    username: "",
    email: "",
    profileImage: "",
  });

  // Detect system theme preference
  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setIsDark(prefersDark);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError(null);

      const result = await getCurrentUserProfile();
      if (result.success && result.data) {
        setProfile(result.data);
        setFormData({
          username: result.data.username,
          email: result.data.email,
          profileImage: result.data.profileImage,
        });
      } else {
        setError(result.message || "Failed to load profile");
      }
      setIsLoading(false);
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!profile?.id) {
      setError("Profile ID not found");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    const result = await updateUserProfileById(profile.id, formData);

    if (result.success && result.data) {
      setProfile(result.data);
      setIsEditing(false);
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(null), 4000);
    } else {
      setError(result.message || "Failed to update profile");
    }

    setIsLoading(false);
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        username: profile.username,
        email: profile.email,
        profileImage: profile.profileImage,
      });
    }
    setIsEditing(false);
    setError(null);
  };

  const bgGradient = isDark
    ? "from-slate-950 via-slate-900 to-slate-950"
    : "from-slate-50 via-white to-slate-100";

  const accentLight = isDark
    ? "from-blue-600 to-purple-600"
    : "from-blue-500 to-purple-500";
  const accentLightHover = isDark
    ? "from-blue-700 to-purple-700"
    : "from-blue-600 to-purple-600";

  const cardBg = isDark
    ? "bg-slate-800/40 border-slate-700/50"
    : "bg-white/60 border-slate-200/60";

  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textSecondary = isDark ? "text-slate-400" : "text-slate-600";
  const textTertiary = isDark ? "text-slate-300" : "text-slate-700";

  const inputBg = isDark
    ? "bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-500 focus:ring-blue-500"
    : "bg-slate-100/80 border-slate-300/80 text-slate-900 placeholder-slate-500 focus:ring-blue-400";

  const headerBg = isDark
    ? "bg-slate-900/40 border-slate-700/50"
    : "bg-white/40 border-slate-200/50";

  const heroBg = isDark
    ? "bg-gradient-to-r from-blue-600/10 to-purple-600/10"
    : "bg-gradient-to-r from-blue-500/5 to-purple-500/5";

  return (
    <div
      className={`min-h-screen transition-colors duration-300 bg-gradient-to-br ${bgGradient}`}
    >
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl animate-pulse ${
            isDark ? "bg-blue-500/5" : "bg-blue-400/10"
          }`}
        ></div>
        <div
          className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl animate-pulse ${
            isDark ? "bg-purple-500/5" : "bg-purple-400/10"
          }`}
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header
          className={`backdrop-blur-md ${headerBg} sticky top-0 border-b transition-colors duration-300`}
        >
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${accentLight} flex items-center justify-center`}
              >
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <h1 className={`text-xl font-bold ${textPrimary} tracking-tight`}>
                eventS
              </h1>
            </div>

            <form action={logout}>
              <button
                type="submit"
                className={`px-6 py-2 rounded-lg transition-all duration-200 font-medium ${
                  isDark
                    ? "bg-red-500/90 hover:bg-red-600 text-white hover:shadow-lg hover:shadow-red-500/30"
                    : "bg-red-500 hover:bg-red-600 text-white hover:shadow-lg hover:shadow-red-500/30"
                } transform hover:scale-105`}
              >
                Logout
              </button>
            </form>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 py-12">
          {/* Page Title */}
          <div className="mb-12 animate-fade-in">
            <h2
              className={`text-4xl md:text-5xl font-bold ${textPrimary} mb-3`}
            >
              Your Profile
            </h2>
            <p className={textSecondary}>
              Manage your account settings and personal information
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div
              className={`mb-6 p-4 rounded-xl transition-colors duration-300 animate-in fade-in ${
                isDark
                  ? "bg-red-500/10 border border-red-500/30"
                  : "bg-red-100/60 border border-red-300/50"
              }`}
            >
              <p
                className={
                  isDark
                    ? "text-red-300 font-medium"
                    : "text-red-700 font-medium"
                }
              >
                {error}
              </p>
              <p
                className={`text-sm mt-1 ${isDark ? "text-red-400" : "text-red-600"}`}
              >
                Make sure your backend has the{" "}
                <code className={isDark ? "bg-red-500/20" : "bg-red-200/40"}>
                  /api/v1/users/me
                </code>{" "}
                endpoint
              </p>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div
              className={`mb-6 p-4 rounded-xl transition-colors duration-300 animate-in fade-in ${
                isDark
                  ? "bg-green-500/10 border border-green-500/30"
                  : "bg-green-100/60 border border-green-300/50"
              }`}
            >
              <p
                className={
                  isDark
                    ? "text-green-300 font-medium"
                    : "text-green-700 font-medium"
                }
              >
                ✓ {successMessage}
              </p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && !profile ? (
            <div
              className={`backdrop-blur-sm ${cardBg} border rounded-2xl p-12 transition-colors duration-300`}
            >
              <div className="flex flex-col items-center justify-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full border-2 ${
                    isDark
                      ? "border-slate-600 border-t-blue-400"
                      : "border-slate-300 border-t-blue-500"
                  } animate-spin`}
                ></div>
                <p className={`${textTertiary} font-medium`}>
                  Loading your profile...
                </p>
              </div>
            </div>
          ) : (
            <div
              className={`backdrop-blur-sm ${cardBg} border rounded-2xl overflow-hidden shadow-2xl transition-colors duration-300`}
            >
              {/* Header Section with Image */}
              <div
                className={`${heroBg} px-8 py-12 border-b ${isDark ? "border-slate-700/50" : "border-slate-200/50"}`}
              >
                <div className="flex flex-col md:flex-row items-start md:items-end gap-8">
                  {/* Profile Image or Avatar */}
                  <div className="relative flex-shrink-0">
                    {profile?.profileImage &&
                    profile.profileImage !== "user-avatar.png" ? (
                      <div className="relative w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-slate-700 shadow-lg">
                        <Image
                          src={`/api/v1/files/${profile.profileImage}`}
                          alt={profile.username}
                          fill
                          className="object-cover"
                          priority
                          onError={(e) => {
                            // Fallback to avatar if image fails to load
                            const img = e.target as HTMLImageElement;
                            img.style.display = "none";
                          }}
                        />
                      </div>
                    ) : (
                      <div
                        className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${accentLight} flex items-center justify-center text-white text-5xl font-bold ring-4 ${
                          isDark ? "ring-slate-700" : "ring-slate-300"
                        } shadow-lg`}
                      >
                        {profile?.username?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                    <div
                      className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-2 ${
                        isDark
                          ? "bg-green-400 border-slate-800"
                          : "bg-green-500 border-white"
                      }`}
                    ></div>
                  </div>

                  <div className="flex-1">
                    <h3 className={`text-3xl font-bold ${textPrimary} mb-1`}>
                      {profile?.username}
                    </h3>
                    <p className={textSecondary}>{profile?.email}</p>
                  </div>

                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className={`px-6 py-3 rounded-lg bg-gradient-to-r ${accentLight} hover:${accentLightHover} text-white font-semibold transition-all duration-200 hover:shadow-lg ${
                        isDark
                          ? "hover:shadow-blue-500/30"
                          : "hover:shadow-blue-400/30"
                      } transform hover:scale-105`}
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>

              {/* Content Section */}
              {isEditing ? (
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  {/* Username */}
                  <div className="group">
                    <label
                      className={`block text-sm font-semibold ${textSecondary} mb-3`}
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border ${inputBg} focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200`}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="group">
                    <label
                      className={`block text-sm font-semibold ${textSecondary} mb-3`}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border ${inputBg} focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200`}
                      required
                    />
                  </div>

                  {/* Profile Image */}
                  <div className="group">
                    <label
                      className={`block text-sm font-semibold ${textSecondary} mb-3`}
                    >
                      Profile Image
                    </label>
                    <input
                      type="text"
                      name="profileImage"
                      value={formData.profileImage}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-xl border ${inputBg} focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200`}
                      placeholder="e.g., user-avatar.png"
                    />
                    <p className={`text-xs ${textSecondary} mt-2`}>
                      Enter the filename of your profile image
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-6">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`flex-1 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 ${
                        isDark
                          ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover:shadow-lg hover:shadow-green-500/30"
                          : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 hover:shadow-lg hover:shadow-green-400/30"
                      }`}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                        isDark
                          ? "border border-slate-600 hover:bg-slate-700/50 text-slate-300"
                          : "border border-slate-300 hover:bg-slate-100 text-slate-700"
                      }`}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-8">
                  {/* Profile Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Username */}
                    <div className="group">
                      <label
                        className={`block text-xs uppercase tracking-wider font-semibold ${textSecondary} mb-2`}
                      >
                        Username
                      </label>
                      <p
                        className={`text-lg font-medium transition-colors ${
                          isDark
                            ? "text-white group-hover:text-blue-400"
                            : "text-slate-900 group-hover:text-blue-600"
                        }`}
                      >
                        {profile?.username}
                      </p>
                    </div>

                    {/* Email */}
                    <div className="group">
                      <label
                        className={`block text-xs uppercase tracking-wider font-semibold ${textSecondary} mb-2`}
                      >
                        Email Address
                      </label>
                      <p
                        className={`text-lg font-medium transition-colors ${
                          isDark
                            ? "text-white group-hover:text-blue-400"
                            : "text-slate-900 group-hover:text-blue-600"
                        }`}
                      >
                        {profile?.email}
                      </p>
                    </div>

                    {/* Gender */}
                    <div className="group">
                      <label
                        className={`block text-xs uppercase tracking-wider font-semibold ${textSecondary} mb-2`}
                      >
                        Gender
                      </label>
                      <p
                        className={`text-lg font-medium transition-colors ${
                          isDark
                            ? "text-white group-hover:text-blue-400"
                            : "text-slate-900 group-hover:text-blue-600"
                        }`}
                      >
                        {profile?.gender || "Not specified"}
                      </p>
                    </div>

                    {/* Date of Birth */}
                    <div className="group">
                      <label
                        className={`block text-xs uppercase tracking-wider font-semibold ${textSecondary} mb-2`}
                      >
                        Date of Birth
                      </label>
                      <p
                        className={`text-lg font-medium transition-colors ${
                          isDark
                            ? "text-white group-hover:text-blue-400"
                            : "text-slate-900 group-hover:text-blue-600"
                        }`}
                      >
                        {profile?.dob
                          ? new Date(profile.dob).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "Not specified"}
                      </p>
                    </div>

                    {/* Profile Image */}
                    <div className="md:col-span-2 group">
                      <label
                        className={`block text-xs uppercase tracking-wider font-semibold ${textSecondary} mb-2`}
                      >
                        Profile Image
                      </label>
                      <p
                        className={`text-lg font-medium transition-colors ${
                          isDark
                            ? "text-white group-hover:text-blue-400"
                            : "text-slate-900 group-hover:text-blue-600"
                        }`}
                      >
                        {profile?.profileImage}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
