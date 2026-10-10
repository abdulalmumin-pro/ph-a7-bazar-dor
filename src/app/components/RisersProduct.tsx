import Image from "next/image";
import Link from "next/link";

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

const API_URL = process.env.RISERS_PRODUCT_URL || "https://openapi.programming-hero.com/api/bazardor/products";

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

export default async function RisersProduct() {
  const res = await fetch(API_URL, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch rising products");
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

  const risers: Product[] = products
    .filter((product: Product) => product.change?.dir === "up")
    .slice(0, 6);

  return (
    <section className="mb-8 w-full font-['Hind_Siliguri',sans-serif]">
      <h2 className="mb-3 flex items-center gap-2 text-[17px] font-bold leading-6 text-[#27322b]">
        <span className="text-[12px] text-red-500">▲</span>
        আজ দাম বেড়েছে
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {risers.map((product: Product) => (
          // সঠিক নিয়ম: প্রতিটি আলাদা কার্ডকে লিংক দিয়ে র‍্যাপ করা হয়েছে
          <Link key={product.id} href={`/details/${product.id}`} className="block group">
            <article
              className="flex min-h-[113px] min-w-0 flex-col justify-between rounded-[14px] border border-[#e1e9e2] bg-[#fbfdfc] p-3 transition-all duration-200 group-hover:border-[#cadbce] group-hover:shadow-sm"
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
                  <h3 className="break-words text-sm font-bold leading-5 text-[#27312a] group-hover:text-emerald-700 transition-colors">
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

                <span className="inline-flex min-h-5 shrink-0 items-center gap-1 rounded-full bg-[#f1f5f1] px-2 py-1 text-[10px] font-semibold leading-none text-red-600">
                  ▲ {formatBn(product.change?.pct ?? 0)}%
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {risers.length === 0 && (
        <p className="py-5 text-center text-sm text-gray-500">
          আজ দাম বেড়েছে এমন কোনো পণ্য নেই।
        </p>
      )}
    </section>
  );
}