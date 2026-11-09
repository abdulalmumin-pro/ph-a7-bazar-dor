"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import ProductCard from "@/app/components/ProductCard";
import { Product } from "@/app/types/product";

type SortOption = "default" | "price-asc" | "price-desc";

const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: "default", label: "ডিফল্ট" },
  { value: "price-asc", label: "দাম: কম থেকে বেশি" },
  { value: "price-desc", label: "দাম: বেশি থেকে কম" },
];

const formatBn = (value: number): string =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 1,
  }).format(value);

interface CategoryProductsProps {
  products: Product[];
}

export default function CategoryProducts({
  products,
}: CategoryProductsProps) {
  const [sort, setSort] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    if (sort === "default") {
      return products;
    }

    return [...products].sort((a, b) =>
      sort === "price-asc" ? a.today - b.today : b.today - a.today
    );
  }, [products, sort]);

  return (
    <>
      {/* Sort Bar */}
      <div className="flex items-center justify-end gap-2 rounded-2xl border border-[#e1e9e2] bg-white px-4 py-3 shadow-sm">
        <label
          htmlFor="product-sort"
          className="text-xs font-medium text-[#727a73] sm:text-sm"
        >
          সাজান
        </label>

        <div className="relative">
          <select
            id="product-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOption)}
            aria-label="পণ্য সাজান"
            className="appearance-none rounded-lg border border-[#e1e9e2] bg-[#fbfdfc] py-1.5 pl-3 pr-8 text-xs font-medium text-[#27322b] outline-none focus:border-[#cadbce] sm:text-sm"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#727a73]"
          />
        </div>
      </div>

      {/* Product Count */}
      <div className="px-1 pt-1">
        <p className="text-xs text-[#727a73] sm:text-sm">
          মোট {formatBn(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      {/* Product Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-[#e1e9e2] bg-white py-12 text-center text-sm text-[#727a73]">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
        </div>
      )}
    </>
  );
}
