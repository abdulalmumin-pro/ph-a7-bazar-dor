
import ProductCard from "@/app/components/ProductCard";
import { Product } from "@/app/types/product";

interface PageProps {
  params: Promise<{ categoryId: string }>;
}

const formatBn = (value: number): string =>
  new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 1,
  }).format(value);

async function getProducts(
  categoryId: string
): Promise<Product[] | null> {
  try {
    const url = new URL(
      process.env.CATEGORY_CATEGORYID_URL as string
    );

    url.searchParams.set("category", categoryId);

    const res = await fetch(url.toString(), {
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      console.error(
        "Failed to fetch products:",
        res.status,
        res.statusText
      );
      return null;
    }

    const result: unknown = await res.json();

    if (Array.isArray(result)) {
      return result as Product[];
    }

    if (
      result &&
      typeof result === "object" &&
      "data" in result &&
      Array.isArray(result.data)
    ) {
      return result.data as Product[];
    }

    return [];
  } catch (error) {
    console.error("Products API request failed:", error);
    return null;
  }
}

const CategoryProduct = async ({ params }: PageProps) => {
  const { categoryId } = await params;
  const products = await getProducts(categoryId);

  // API error state
  if (products === null) {
    return (
      <div className="min-h-screen bg-[#f4f6f4] px-4 py-12 font-['Hind_Siliguri',sans-serif]">
        <div className="mx-auto max-w-6xl rounded-2xl border border-[#e1e9e2] bg-white p-8 text-center">
          <h1 className="text-xl font-bold text-[#27322b]">
            পণ্যের তথ্য লোড করা যায়নি
          </h1>
          <p className="mt-2 text-sm text-[#727a73]">
            সার্ভারে সমস্যা হচ্ছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।
          </p>
        </div>
      </div>
    );
  }

  const categoryName = products[0]?.categoryNameBn || "পণ্য তালিকা";
  const categoryIcon = products[0]?.categoryIcon || "🛒";
  const totalItemsCount = products.length;

  return (
    <div className="min-h-screen bg-[#f4f6f4] px-4 py-6 font-['Hind_Siliguri',sans-serif] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-4">
        {/* Category Header */}
        <div className="flex items-center gap-4 rounded-2xl border border-[#e1e9e2] bg-white p-5 shadow-sm">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#f0f5f1] text-3xl">
            {categoryIcon}
          </div>

          <div>
            <h1 className="text-xl font-bold text-[#27322b] sm:text-2xl">
              {categoryName}
            </h1>
            <p className="mt-0.5 text-xs text-[#727a73] sm:text-sm">
              {formatBn(totalItemsCount)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        {/* Sort Bar */}
        <div className="flex items-center justify-end gap-2 rounded-2xl border border-[#e1e9e2] bg-white px-4 py-3 shadow-sm">
          <span className="text-xs font-medium text-[#727a73] sm:text-sm">
            সাজান
          </span>

          <select
            defaultValue="default"
            aria-label="পণ্য সাজান"
            className="rounded-lg border border-[#e1e9e2] bg-[#fbfdfc] px-3 py-1.5 text-xs font-medium text-[#27322b] outline-none focus:border-[#cadbce] sm:text-sm"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">কম থেকে বেশি</option>
            <option value="high-to-low">বেশি থেকে কম</option>
          </select>
        </div>

        {/* Product Count */}
        <div className="px-1 pt-1">
          <p className="text-xs text-[#727a73] sm:text-sm">
            মোট {formatBn(totalItemsCount)}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#e1e9e2] bg-white py-12 text-center text-sm text-[#727a73]">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProduct;
