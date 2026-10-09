import ProductCard from "@/app/components/ProductCard";
import { Product } from "@/app/types/product";

const API_URL = "https://api.api-store.workers.dev/api/bazardor/products";

const formatBn = (value: number): string =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 1,
  }).format(value);

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
      {/* Original Header */}
      <div className="mb-3">
        <h2 className="text-[17px] font-bold leading-6 text-[#27322b]">
          সব পণ্য
        </h2>
        <p className="text-[12px] leading-4 text-[#727a73]">
          মোট {formatBn(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      {/* Grid rendering extracted ProductCard */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <p className="py-5 text-center text-sm text-gray-500">
          কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
}