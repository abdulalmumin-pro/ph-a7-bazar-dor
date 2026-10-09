
import Image from "next/image";

const Banner = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="mx-auto mt-5 max-w-7xl px-4">
      <div className="grid grid-cols-1 items-center gap-4 rounded-[26px] border border-[#dfe8e1] bg-[#f9fcfa] px-4 py-6 sm:px-[18px] md:grid-cols-3 md:px-[18px] md:py-5">

        {/* Left side */}
        <div className="min-w-0 md:col-span-2">
          <span className="inline-flex rounded-full bg-[#e1f2e7] px-3.5 py-1.5 text-sm font-medium leading-5 text-green-700">
            {date}
          </span>

          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#202820] md:text-[38px]">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-5 text-base leading-7 text-[#66716a]">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <button
            type="button"
            className="mt-7 rounded-lg bg-[#07883e] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#067333]"
          >
            সব পণ্য দেখুন
          </button>
        </div>

        {/* Right side */}
        <div className="flex min-w-0 items-center justify-center md:col-span-1 md:justify-end">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের তাজা সবজি"
            width={240}
            height={220}
            priority
            className="h-auto w-52 object-contain sm:w-56 md:w-full md:max-w-[240px]"
          />
        </div>

      </div>
    </section>
  );
};

export default Banner;

