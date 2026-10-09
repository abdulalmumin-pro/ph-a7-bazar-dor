import ProductCard from "@/app/components/ProductCard";
import { Product } from "@/app/types/product";

interface PageProps {
  params: Promise<{ categoryId: string }>;
}

const formatBn = (value: number): string =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 1,
  }).format(value);

const CategoryProduct = async ({ params }: PageProps) => {
  const { categoryId } = await params;

  // Fetch product list for current category
  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products?category=${categoryId}`,
    { cache: "no-store" }
  );

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

  // Extract category banner information from first item
  const categoryName = products[0]?.categoryNameBn || "পণ্য তালিকা";
  const categoryIcon = products[0]?.categoryIcon || "🛒";
  const totalItemsCount = products.length;

  return (
    <div className="min-h-screen bg-[#f4f6f4] px-4 py-6 sm:px-6 lg:px-8 font-['Hind_Siliguri',sans-serif]">
      <div className="mx-auto max-w-6xl space-y-4">
        
        {/* Category Header Card */}
        <div className="flex items-center gap-4 rounded-2xl border border-[#e1e9e2] bg-white p-5 shadow-sm">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#f0f5f1] text-3xl">
            {categoryIcon}
          </div>
          <div>
            <h1 className="text-xl font-bold sm:text-2xl text-[#27322b]">
              {categoryName}
            </h1>
            <p className="mt-0.5 text-xs text-[#727a73] sm:text-sm">
              {formatBn(totalItemsCount)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        {/* Filter / Sort Bar */}
        <div className="flex items-center justify-end gap-2 rounded-2xl border border-[#e1e9e2] bg-white px-4 py-3 shadow-sm">
          <span className="text-xs font-medium text-[#727a73] sm:text-sm">
            সাজান
          </span>
          <select className="rounded-lg border border-[#e1e9e2] bg-[#fbfdfc] px-3 py-1.5 text-xs font-medium text-[#27322b] outline-none focus:border-[#cadbce] sm:text-sm">
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">কম দাম</option>
            <option value="high-to-low">বেশি দাম</option>
          </select>
        </div>

        {/* Status Count Text */}
        <div className="px-1 pt-1">
          <p className="text-xs text-[#727a73] sm:text-sm">
            মোট {formatBn(totalItemsCount)}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        {/* Product Cards Grid Layout */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="rounded-2xl border border-[#e1e9e2] bg-white py-12 text-center text-sm text-[#727a73]">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </div>
        )}

      </div>
    </div>
  );
};

export default CategoryProduct;