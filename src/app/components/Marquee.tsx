import MarqueeContent from "./MarqueeContent";


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

export default async function Marquee() {
  let data: Product[] = [];

  try {
    const res = await fetch(process.env.MARQUEE_URL as string, {
      cache: "no-store",
    });

    if (res.ok) {
      data = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch marquee products:", error);
  }

  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return <MarqueeContent data={data} />;
}
