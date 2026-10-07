import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

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

const Marquee = async () => {
  let data: Product[] = [];

  try {
    const res = await fetch(
      "https://api.api-store.workers.dev/api/bazardor/products",
      {
        cache: "no-store",
      }
    );

    if (res.ok) {
      data = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch marquee products:", error);
  }

  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

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

  return (
    <div className="w-full max-w-full overflow-hidden border-b border-slate-200 bg-[#f8faf9] py-1 select-none">
      <div className="flex w-full items-center overflow-hidden">
        <MarqueeText
          direction="right"
          duration={data.length > 5 ? 25 : 15}
          pauseOnHover={true}
        >
          <div className="flex items-center">
            {data.map((item) => {
              const isUp = item.change?.dir === "up";

              return (
                <div
                  key={item.id}
                  className="
                    inline-flex h-[38px] shrink-0 items-center justify-center
                    border-r border-[#e5ebe7]
                    bg-[#f8faf9]
                    px-2.5
                    xs:px-3
                    sm:h-[42px] sm:px-4
                    md:px-5
                  "
                >
                  {/* Category Icon */}
                  <span
                    className="
                      mr-1 flex h-4 w-4 shrink-0 items-center justify-center
                      text-[14px]
                      xs:mr-1.5 xs:h-5 xs:w-5 xs:text-[15px]
                      sm:mr-2 sm:h-6 sm:w-6 sm:text-[16px]
                    "
                  >
                    {item.categoryIcon || item.image || "🛒"}
                  </span>

                  {/* Product Name */}
                  <span
                    className="
                      whitespace-nowrap
                      text-[12px] font-medium text-[#26332d]
                      xs:text-[13px]
                      sm:text-[14px]
                      md:text-[15px]
                    "
                  >
                    {item.nameBn}
                  </span>

                  {/* Price */}
                  <span
                    className="
                      ml-1 whitespace-nowrap
                      text-[11px] text-[#303a35]
                      xs:ml-1.5 xs:text-[12px]
                      sm:ml-2 sm:text-[13px]
                      md:text-[14px]
                    "
                  >
                    {bnNumber(item.today)} টাকা/
                    {unitBn[item.unit] || item.unit}
                  </span>

                  {/* Price Change */}
                  <span
                    className={`
                      ml-1.5 whitespace-nowrap
                      text-[11px] font-semibold
                      xs:text-[12px]
                      sm:ml-2 sm:text-[13px]
                      ${isUp ? "text-[#dc3b3b]" : "text-[#079447]"}
                    `}
                  >
                    {isUp ? "▲" : "▼"} {bnNumber(item.change?.pct ?? 0)}%
                  </span>
                </div>
              );
            })}
          </div>
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marquee;