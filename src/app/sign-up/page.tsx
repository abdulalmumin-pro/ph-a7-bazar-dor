"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SignUp = () => {
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as Record<string, string>;

    if (user.password !== user.confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না!");
      return;
    }

    console.log("Form Data Submitted:", user);

    const { data, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
      callbackURL: "/"
    });

    if (error) {
      console.log(error);
      toast.error("সাইন আপ ব্যর্থ হয়েছে!");
      return;
    }

    if (data) {
      console.log(data);
      toast.success("সাইন আপ সফল হয়েছে!");
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f5f2] flex flex-col justify-center items-center py-6 px-4">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="text-gray-600 text-xs">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      {/* Card Container */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-full max-w-md">
        <form onSubmit={onSubmit} className="space-y-3.5">
          {/* Name Field */}
          <div>
            <label className="block text-xs font-semibold text-gray-800 mb-1">
              নাম
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="যেমন: রহিম উদ্দিন"
              className="w-full px-3.5 py-2 bg-[#fbfcfb] border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-600 transition"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-semibold text-gray-800 mb-1">
              ইমেইল
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full px-3.5 py-2 bg-[#fbfcfb] border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-600 transition"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-semibold text-gray-800 mb-1">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              name="password"
              required
              minLength={8}
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full px-3.5 py-2 bg-[#fbfcfb] border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-600 transition"
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-xs font-semibold text-gray-800 mb-1">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              placeholder="আবার লিখুন"
              className="w-full px-3.5 py-2 bg-[#fbfcfb] border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-600 transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2.5 bg-[#018642] hover:bg-[#017238] text-white text-sm font-semibold rounded-lg shadow-sm transition duration-200 mt-1"
          >
            অ্যাকাউন্ট তৈরি করুন
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-4 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <span className="relative bg-white px-2.5 text-[11px] text-gray-500">
            অথবা
          </span>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-2.5 py-2 border border-gray-200 rounded-lg bg-[#fbfcfb] text-gray-800 font-semibold text-xs hover:bg-gray-50 transition"
          >
            <FcGoogle className="text-sm" />
            Google দিয়ে চালিয়ে যান
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-2.5 py-2 border border-gray-200 rounded-lg bg-[#fbfcfb] text-gray-800 font-semibold text-xs hover:bg-gray-50 transition"
          >
            <FaGithub className="text-sm text-black" />
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        {/* Login Link */}
        <div className="text-center text-xs font-medium text-gray-700">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/sign-in"
            className="text-[#018642] font-semibold hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </div>
      </div>

      {/* Back to Home Link */}
      <div className="mt-5 text-center">
        <Link
          href="/"
          className="text-xs font-medium text-gray-500 hover:text-gray-700 transition"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default SignUp;