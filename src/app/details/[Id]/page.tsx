import { Suspense } from "react";

// টাইপ ইন্টারফেস ডিফাইন করা
interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Product {
  id: number | string;
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
  change: {
    dir: "up" | "down";
    pct: number;
  };
  markets: Market[];
}

const getProduct = async (): Promise<Product[]> => {
  try {
    const res = await fetch(
      process.env.DETAILS_PAGE_URL as string,
      { cache: 'no-store' }
    );
    const result = await res.json();
    
    if (Array.isArray(result)) {
      return result;
    } else if (result.data && Array.isArray(result.data)) {
      return result.data;
    } else if (result.products && Array.isArray(result.products)) {
      return result.products;
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
};

interface PageProps {
  params: Promise<{ Id: string }>;
}

export default async function ProductDetails({ params }: PageProps) {
  return (
    <Suspense fallback={<div className="p-4 text-center text-gray-500 text-sm">লোডিং হচ্ছে...</div>}>
      <ProductView params={params} />
    </Suspense>
  );
}

async function ProductView({ params }: PageProps) {
  const { Id } = await params;

  const products = await getProduct();
  const product = products.find((pro) => String(pro.id) === String(Id));

  if (!product) {
    return <div className="p-6 text-center text-red-500 text-sm font-semibold">প্রোডাক্টটি পাওয়া যায়নি!</div>;
  }

  const minPrices = product.markets?.map((m) => m.min) || [0];
  const maxPrices = product.markets?.map((m) => m.max) || [0];
  const lowestPrice = Math.min(...minPrices);
  const highestPrice = Math.max(...maxPrices);
  const avgPrice = Math.round((lowestPrice + highestPrice) / 2);

  return (
    <div className="w-full min-h-screen bg-slate-100 py-4 px-3 md:px-8">
      <div className="max-w-5xl mx-auto space-y-4 text-xs md:text-sm">
        <div className="breadcrumbs text-gray-500 text-xs py-0 my-0 overflow-x-auto">
          <ul>
            <li>হোম</li>
            <li>{product.categoryNameBn}</li>
            <li>{product.nameBn}</li>
          </ul>
        </div>

        {/* টপ কার্ড: প্রোডাক্ট ওভারভিউ */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="text-3xl md:text-4xl bg-slate-50 p-3.5 rounded-2xl flex items-center justify-center w-16 h-16 shrink-0 border border-slate-100">
              {product.image}
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-slate-800">{product.nameBn}</h1>
              <p className="text-gray-500 text-xs mt-0.5">প্রতি কেজি - {product.categoryNameBn}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                গতকালের তুলনায় আজ দাম {product.change?.dir === "up" ? "বেড়েছে" : "কমেছে"} {product.change?.pct}%
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/60 p-3.5 rounded-xl text-center w-full sm:w-auto sm:min-w-[140px] flex flex-col justify-center">
            <p className="text-[11px] text-gray-500 font-medium">আজকের দাম</p>
            <p className="text-2xl font-extrabold text-slate-800 my-0.5">{product.today}</p>
            <p className="text-[10px] text-gray-500">টাকা / কেজি</p>
            <p className={`text-[11px] mt-0.5 font-semibold flex items-center justify-center gap-0.5 ${product.change?.dir === "up" ? "text-red-500" : "text-emerald-600"}`}>
              <span>{product.change?.dir === "up" ? "▲" : "▼"}</span>
              <span>{product.change?.pct}%</span>
            </p>
          </div>
        </div>

        {/* দামের সারসংক্ষেপ */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
          <h2 className="text-base font-bold text-slate-800">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <p className="text-[11px] text-gray-500 font-medium">সর্বনিম্ন দাম</p>
              <p className="text-base font-bold text-emerald-600 mt-0.5">{lowestPrice} টাকা</p>
              <p className="text-[10px] text-gray-400 mt-0.5">সবচেয়ে কম দামের বাজার</p>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <p className="text-[11px] text-gray-500 font-medium">সর্বাধিক দাম</p>
              <p className="text-base font-bold text-red-500 mt-0.5">{highestPrice} টাকা</p>
              <p className="text-[10px] text-gray-400 mt-0.5">সবচেয়ে বেশি দামের বাজার</p>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <p className="text-[11px] text-gray-500 font-medium">গড় দাম</p>
              <p className="text-base font-bold text-slate-800 mt-0.5">{avgPrice} টাকা</p>
              <p className="text-[10px] text-gray-400 mt-0.5">প্রতি কেজি-র হিসাব</p>
            </div>
          </div>
        </div>

        {/* today's price table */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200/60 space-y-3">
          <h2 className="text-base font-bold text-slate-800">বাজারভিত্তিক আজকের দাম</h2>
          <div className="overflow-x-auto">
            <table className="table w-full text-xs md:text-sm min-w-[500px]">
              <thead>
                <tr className="border-b border-slate-100 text-gray-400 font-medium">
                  <th className="bg-transparent py-2">বাজার</th>
                  <th className="bg-transparent py-2">বিভাগ</th>
                  <th className="bg-transparent py-2">সর্বনিম্ন</th>
                  <th className="bg-transparent py-2">সর্বাধিক</th>
                  <th className="bg-transparent py-2">গড়</th>
                </tr>
              </thead>
              <tbody>
                {product.markets?.map((m, index) => {
                  const marketAvg = Math.round((m.min + m.max) / 2);
                  return (
                    <tr key={index} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                      <td className="font-medium text-slate-700 py-2.5">{m.market}</td>
                      <td className="text-gray-500 py-2.5">{m.division}</td>
                      <td className="text-gray-600 py-2.5">{m.min} টাকা</td>
                      <td className="text-gray-600 py-2.5">{m.max} টাকা</td>
                      <td className="text-gray-600 py-2.5">{marketAvg} টাকা</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}