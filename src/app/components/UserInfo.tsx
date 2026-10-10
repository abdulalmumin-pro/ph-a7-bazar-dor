"use client";

import { useState, useRef, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, User, LogOut } from "lucide-react";
import { toast } from "react-toastify";

const UserInfo = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // সাইন আউট হ্যান্ডলার
  const handleSignOut = async () => {
    setIsDropdownOpen(false);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সাইন আউট সফল হয়েছে!");
          window.location.href = "/sign-in";
        },
        onError: () => {
          toast.error("সাইন আউট ব্যর্থ হয়েছে!");
        },
      },
    });
  };

  if (isPending) {
    return <div className="h-10 w-24 animate-pulse rounded-full bg-slate-100" />;
  }

  return (
    <div>
      {user ? (
        <div>
          {/* PROFILE DROPDOWN */}
          <div ref={dropdownRef} className="relative hidden items-center sm:flex">
            <button
              type="button"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center gap-3 rounded-full py-1.5 pl-2 pr-3 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              {/* User Avatar */}
              <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-slate-100 shadow-sm">
                <Image
                  src={user.image || "/profile.png"}
                  alt={user.name || "Rezwan"}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>

              {/* Username + Arrow */}
              <div className="flex items-center gap-2">
                <span className="text-[17px] font-medium text-slate-800">
                  {user.name || "Rezwan"}
                </span>

                <ChevronDown
                  aria-hidden="true"
                  className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {/* DROPDOWN MENU */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-3 w-80 rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-[19px] font-bold tracking-tight text-slate-900">
                    {user.name || "Rezwan Ahmed"}
                  </h3>

                  <p className="mt-1 break-words text-[14px] text-slate-500">
                    {user.email || "rezwanahmed@gmail.com"}
                  </p>
                </div>

                <div className="mt-4 flex flex-col gap-1">
                  <Link
                    href="/profile"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[16px] font-medium text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    <User
                      aria-hidden="true"
                      className="h-5 w-5 text-slate-600"
                    />
                    <span>আমার প্রোফাইল</span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[16px] font-medium text-red-600 transition-colors hover:bg-red-50"
                  >
                    <LogOut
                      aria-hidden="true"
                      className="h-5 w-5 text-red-500"
                    />
                    <span>সাইন আউট</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ================= USER NOT LOGGED IN ================= */
        <div className="flex items-center gap-6">
          <Link
            href="/sign-in"
            className="text-[16px] font-medium text-slate-700 transition-colors hover:text-emerald-600"
          >
            সাইন ইন
          </Link>

          <Link
            href="/sign-up"
            className="rounded-xl bg-[#07883e] px-5 py-2.5 text-[16px] font-semibold text-white shadow-md transition hover:bg-[#067333]"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;