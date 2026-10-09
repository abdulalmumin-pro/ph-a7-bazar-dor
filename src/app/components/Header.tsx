"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import Marquee from "./Marquee";

const Header = () => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    setFormattedDate(
      new Date().toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
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

          {/* Live Status */}
          <div className="hidden items-center gap-2 sm:flex">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>

            <span className="text-xs font-semibold tracking-wide text-slate-600">
              লাইভ আপডেট
            </span>
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