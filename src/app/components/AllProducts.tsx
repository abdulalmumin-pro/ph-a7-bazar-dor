import Image from "next/image";

// Explicit TypeScript interfaces
export interface ProductChange {
  dir: "up" | "down" | "none" | string;
  pct: number;
}

export interface Product {
  id: string | number;
  nameBn: string;
  unit: string;
  today: number;
  image?: string;
  categoryIcon?: string;
  change: ProductChange;
}

const API_URL = "https://api.api-store.workers.dev/api/bazardor/products";

const formatBn = (value: number): string =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 1,
  }).format(value);

const getUnitLabel = (unit: string): string => {
  const units: Record<string, string> = {
    kg: "প্রতি কেজি",
    piece: "প্রতি পিস",
    dozen: "প্রতি ডজন",
    liter: "প্রতি লিটার",
  };

  return units[unit] ?? "প্রতি কেজি";
};

export default async function AllProducts() {
  const res = await fetch(API_URL, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const result: unknown = await res.json();

  const products: Product[] = Array.isArray(result)
    ? (result as Product[])
    : result &&
        typeof result === "object" &&
        "data" in result &&
        Array.isArray((result as { data: unknown }).data)
      ? ((result as { data: Product[] }).data as Product[])
      : [];

  return (
    <section className="w-full font-['Hind_Siliguri',sans-serif]">
      <div className="mb-3">
        <h2 className="text-[17px] font-bold leading-6 text-[#27322b]">
          সব পণ্য
        </h2>
        <p className="text-[12px] leading-4 text-[#727a73]">
          মোট {formatBn(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      {/* Grid locked to 3 columns across all larger screen lines */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {products.map((product: Product) => {
          const dir = product.change?.dir;
          const pct = product.change?.pct ?? 0;

          return (
            <article
              key={product.id}
              className="flex min-h-[113px] min-w-0 flex-col justify-between rounded-[14px] border border-[#e1e9e2] bg-[#fbfdfc] p-3 transition-colors duration-200 hover:border-[#cadbce]"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f0f5f1] text-[21px]">
                  {product.image &&
                  (/^https?:\/\//i.test(product.image) ||
                    product.image.startsWith("/")) ? (
                    <Image
                      src={product.image}
                      alt={product.nameBn}
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    product.image || product.categoryIcon || "🛒"
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="break-words text-sm font-bold leading-5 text-[#27312a]">
                    {product.nameBn}
                  </h3>
                  <p className="text-[11px] leading-4 text-[#707970]">
                    {getUnitLabel(product.unit)}
                  </p>
                </div>
              </div>

              <div className="mt-2 flex items-end justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[10px] leading-4 text-[#727a73]">
                    আজকের দাম
                  </p>
                  <p className="whitespace-nowrap text-[15px] font-bold leading-5 text-[#263029]">
                    {formatBn(product.today)} টাকা
                  </p>
                </div>

                {/* Dynamic Price Badges */}
                {dir === "up" && (
                  <span className="inline-flex min-h-5 shrink-0 items-center gap-1 rounded-full bg-[#f1f5f1] px-2 py-1 text-[10px] font-semibold leading-none text-red-600">
                    ▲ {formatBn(pct)}%
                  </span>
                )}
                {dir === "down" && (
                  <span className="inline-flex min-h-5 shrink-0 items-center gap-1 rounded-full bg-[#f1f5f1] px-2 py-1 text-[10px] font-semibold leading-none text-emerald-600">
                    ▼ {formatBn(pct)}%
                  </span>
                )}
                {dir !== "up" && dir !== "down" && (
                  <span className="inline-flex min-h-5 shrink-0 items-center gap-1 rounded-full bg-[#f1f5f1] px-2 py-1 text-[10px] font-semibold leading-none text-[#707970]">
                    — {formatBn(pct)}%
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {products.length === 0 && (
        <p className="py-5 text-center text-sm text-gray-500">
          কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
}