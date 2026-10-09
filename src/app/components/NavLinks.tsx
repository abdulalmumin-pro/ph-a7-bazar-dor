"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export interface CategoryType {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export default function NavLinks() {
  const pathname = usePathname();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/categories"
        );
        if (res.ok) {
          const data: CategoryType[] = await res.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading || !Array.isArray(categories) || categories.length === 0) {
    return null;
  }

  return (
    <nav className="w-full border-b border-slate-100 bg-white">
      <div
        className="
          mx-auto flex h-[42px] max-w-7xl
          items-center gap-6 overflow-x-auto
          px-4 scrollbar-none
          sm:gap-8 sm:px-6
          lg:px-8
        "
      >
        {categories.map((category) => {
          const categoryPath = `/category/${category.slug}`;
          const isActive = pathname === categoryPath;

          return (
            <Link
              key={category.id}
              href={categoryPath}
              className={`
                group relative flex shrink-0 items-center gap-2
                whitespace-nowrap py-2
                text-[15px] font-medium transition-colors duration-200
                sm:text-[16px]
                ${
                  isActive
                    ? "font-bold text-emerald-600"
                    : "text-[#26332d] hover:text-emerald-600"
                }
              `}
            >
              <span
                className={`
                  flex h-6 w-6 items-center justify-center
                  text-[18px] transition-transform duration-200
                  group-hover:scale-110
                  ${isActive ? "scale-110" : ""}
                `}
              >
                {category.icon}
              </span>

              <span>{category.nameBn}</span>

              {/* Active Indicator Line at the Bottom */}
              {isActive && (
                <span className="absolute bottom-0 left-0 h-[2.5px] w-full rounded-full bg-emerald-600" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}