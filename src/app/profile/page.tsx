"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await authClient.updateUser({
        name: name,
      });

      if (error) {
        toast.error("প্রোফাইল আপডেট ব্যর্থ হয়েছে!");
      } else {
        toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
      }
    } catch (err) {
      console.error(err);
      toast.error("কিছু সমস্যা হয়েছে!");
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সাইন আউট সফল হয়েছে!");
          router.push("/sign-in");
        },
        onError: () => {
          toast.error("সাইন আউট ব্যর্থ হয়েছে!");
        },
      },
    });
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f3f6f3]">
        <div className="h-10 w-32 animate-pulse rounded-xl bg-slate-200" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f6f3] px-3 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-4 sm:space-y-6">
        {/* PAGE HEADER */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1c2e24]">
            আমার প্রোফাইল
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm text-slate-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* USER CARD (TOP SECTION) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-4 sm:p-6 shadow-sm">
          <div className="flex items-center gap-3.5 w-full sm:w-auto min-w-0">
            {/* User Avatar */}
            <div className="relative h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-2xl bg-slate-100 shrink-0">
              <Image
                src={user?.image || "/profile.png"}
                alt={user?.name || "User"}
                fill
                className="object-cover"
              />
            </div>

            {/* User Info */}
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 truncate">
                {user?.name || "Rezwan Ahmed"}
              </h2>
              <p className="mt-0.5 text-xs sm:text-sm text-slate-500 truncate">
                {user?.email || "rezwanahmed@gmail.com"}
              </p>
            </div>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            type="button"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-500 shadow-sm transition-colors hover:bg-red-50 shrink-0"
          >
            <LogOut className="h-4 w-4" />
            <span>সাইন আউট</span>
          </button>
        </div>

        {/* INFO EDIT FORM (BOTTOM SECTION) */}
        <div className="rounded-2xl border border-slate-100 bg-white p-4 sm:p-6 shadow-sm">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">তথ্য</h3>

          <form onSubmit={handleUpdate} className="mt-4 sm:mt-6 space-y-4 sm:space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-xs sm:text-sm font-semibold text-slate-700"
              >
                নাম
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-[#f9fbf9] px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-slate-800 transition-colors focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#008744] py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white shadow-md transition-all hover:bg-[#00753a] active:scale-[0.99]"
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