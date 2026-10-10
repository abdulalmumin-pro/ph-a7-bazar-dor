"use client";

interface ProductChange {
  dir: "up" | "down";
  pct: number;
}

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: ProductChange;
}

interface MarqueeContentProps {
  data: Product[];
}

export default function MarqueeContent({ data }: MarqueeContentProps) {
  const bnNumber = (value: number | string) =>
    String(value ?? 0).replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);

  const unitBn: Record<string, string> = {
    kg: "কেজি",
    liter: "লিটার",
    litre: "লিটার",
    piece: "পিস",
    dozen: "ডজন",
    gram: "গ্রাম",
  };

  // যদি ডেটা খালি থাকে, তাহলে কিছু দেখাবে না
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return (
    <div className="w-full overflow-hidden border-b border-slate-200 bg-[#f8faf9] py-1 select-none">
      <div className="flex w-full overflow-hidden">
        {/* অ্যানিমেশন কন্টেইনার */}
        <div className="animate-marquee flex items-center">
          {/* প্রথমবার ডেটা রেন্ডার */}
          {data.map((item) => {
            const isUp = item.change?.dir === "up";

            return (
              <div
                key={`1-${item.id}`}
                className="inline-flex h-[38px] shrink-0 items-center justify-center border-r border-[#e5ebe7] bg-[#f8faf9] px-3 sm:h-[42px] sm:px-4"
              >
                {/* Category Icon */}
                <span className="mr-1.5 flex h-5 w-5 shrink-0 items-center justify-center text-[15px] sm:mr-2 sm:h-6 sm:w-6 sm:text-[16px]">
                  {item.categoryIcon || item.image || "🛒"}
                </span>

                {/* Product Name */}
                <span className="whitespace-nowrap text-[13px] font-medium text-[#26332d] sm:text-[14px] md:text-[15px]">
                  {item.nameBn}
                </span>

                {/* Price */}
                <span className="ml-1.5 whitespace-nowrap text-[12px] text-[#303a35] sm:ml-2 sm:text-[13px] md:text-[14px]">
                  {bnNumber(item.today)} টাকা/{unitBn[item.unit] || item.unit}
                </span>

                {/* Price Change */}
                <span
                  className={`ml-1.5 whitespace-nowrap text-[12px] font-semibold sm:ml-2 sm:text-[13px] ${
                    isUp ? "text-[#dc3b3b]" : "text-[#079447]"
                  }`}
                >
                  {isUp ? "▲" : "▼"} {bnNumber(item.change?.pct ?? 0)}%
                </span>
              </div>
            );
          })}

          {/* ইনফিনিটি লুপের জন্য দ্বিতীয়বার ডেটা রেন্ডার */}
          {data.map((item) => {
            const isUp = item.change?.dir === "up";

            return (
              <div
                key={`2-${item.id}`}
                className="inline-flex h-[38px] shrink-0 items-center justify-center border-r border-[#e5ebe7] bg-[#f8faf9] px-3 sm:h-[42px] sm:px-4"
              >
                <span className="mr-1.5 flex h-5 w-5 shrink-0 items-center justify-center text-[15px] sm:mr-2 sm:h-6 sm:w-6 sm:text-[16px]">
                  {item.categoryIcon || item.image || "🛒"}
                </span>
                <span className="whitespace-nowrap text-[13px] font-medium text-[#26332d] sm:text-[14px] md:text-[15px]">
                  {item.nameBn}
                </span>
                <span className="ml-1.5 whitespace-nowrap text-[12px] text-[#303a35] sm:ml-2 sm:text-[13px] md:text-[14px]">
                  {bnNumber(item.today)} টাকা/{unitBn[item.unit] || item.unit}
                </span>
                <span
                  className={`ml-1.5 whitespace-nowrap text-[12px] font-semibold sm:ml-2 sm:text-[13px] ${
                    isUp ? "text-[#dc3b3b]" : "text-[#079447]"
                  }`}
                >
                  {isUp ? "▲" : "▼"} {bnNumber(item.change?.pct ?? 0)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}