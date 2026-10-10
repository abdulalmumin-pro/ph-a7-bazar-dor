"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, User, LogOut } from "lucide-react";
import NavLinks from "./NavLinks";
import Marquee from "./Marquee";

const Header = () => {
  const [formattedDate, setFormattedDate] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFormattedDate(
      new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    );
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      {/* HEADER TOP */}
      <div className="h-[80px] border-b border-slate-100">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo + Title */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 shadow-sm transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর"
                width={34}
                height={34}
                priority
                className="h-8 w-8 object-contain brightness-0 invert"
              />
            </div>

            <div className="leading-none">
              <h1 className="text-[24px] font-bold tracking-tight text-[#1f2d27]">
                বাজার দর
              </h1>

              <p className="mt-2 text-[13px] font-medium text-slate-500">
                {formattedDate || "\u00A0"}
              </p>
            </div>
          </Link>

          {/* header right - Profile Dropdown */}
          <div className="relative hidden items-center sm:flex" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center gap-3 rounded-full py-1.5 pl-2 pr-3 transition-colors hover:bg-slate-50 focus:outline-none"
            >
              {/* User Avatar */}
              <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-slate-100 shadow-sm">
                <Image
                  src="/profile.png" /* Replace with your user avatar path or dynamic user image */
                  alt="Rezwan"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Username & Arrow */}
              <div className="flex items-center gap-2">
                <span className="text-[17px] font-medium text-slate-800">
                  Rezwan
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {/* Dropdown Card / Menu Popup */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-3 w-80 rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl transition-all animate-in fade-in zoom-in-95">
                {/* User Info Header inside Popup */}
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-[19px] font-bold tracking-tight text-slate-900">
                    Rezwan Ahmed
                  </h3>
                  <p className="mt-1 text-[14px] text-slate-500">
                    rezwanahmed@gmail.com
                  </p>
                </div>

                {/* Menu Actions */}
                <div className="mt-4 flex flex-col gap-1">
                  <Link
                    href="/profile"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[16px] font-medium text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    <User className="h-5 w-5 text-slate-600" />
                    <span>আমার প্রোফাইল</span>
                  </Link>

                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      // Add your sign out logic here
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[16px] font-medium text-red-600 transition-colors hover:bg-red-50"
                  >
                    <LogOut className="h-5 w-5 text-red-500" />
                    <span>সাইন আউট</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CATEGORY NAV */}
      <NavLinks />

      {/* PRICE MARQUEE */}
      <Marquee />
    </header>
  );
};

export default Header;