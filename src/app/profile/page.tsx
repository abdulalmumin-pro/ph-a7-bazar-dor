"use client";

import React, { useState } from "react";
import Image from "next/image";
import { LogOut } from "lucide-react";

const ProfilePage = () => {
  const [name, setName] = useState("Rezwan Ahmed");

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Add update logic here
  };

  const handleSignOut = () => {
    // Add sign out logic here
  };

  return (
    <div className="min-h-screen bg-[#f3f6f3] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* PAGE HEADER */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1c2e24]">
            আমার প্রোফাইল
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* USER CARD (TOP SECTION) */}
        <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            {/* User Avatar */}
            <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-slate-100">
              <Image
                src="/profile.png"
                alt="Rezwan Ahmed"
                fill
                className="object-cover"
              />
            </div>

            {/* User Info */}
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Rezwan Ahmed
              </h2>
              <p className="mt-0.5 text-sm text-slate-500">
                rezwanahmed@gmail.com
              </p>
            </div>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-500 shadow-sm transition-colors hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            <span>সাইন আউট</span>
          </button>
        </div>

        {/* INFO EDIT FORM (BOTTOM SECTION) */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900">তথ্য</h3>

          <form onSubmit={handleUpdate} className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-slate-700"
              >
                নাম
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-[#f9fbf9] px-4 py-3 text-sm text-slate-800 transition-colors focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#008744] py-3 text-base font-medium text-white shadow-md transition-all hover:bg-[#00753a] active:scale-[0.99]"
            >
              আপডেট
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;