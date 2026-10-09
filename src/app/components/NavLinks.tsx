
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

const API_URL =
  "https://api.api-store.workers.dev/api/bazardor/categories";

export default function NavLinks() {
  const pathname = usePathname();
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function fetchCategories() {
      try {
        const res = await fetch(API_URL);

        if (!res.ok) {
          throw new Error(`Categories API error: ${res.status}`);
        }

        const result: unknown = await res.json();

        // API সরাসরি array অথবা { data: [...] } দিতে পারে
        let categoryData: unknown = result;

        if (
          result &&
          typeof result === "object" &&
          !Array.isArray(result) &&
          "data" in result
        ) {
          categoryData = result.data;
        }

        if (!Array.isArray(categoryData)) {
          throw new Error("Invalid categories API response");
        }

        if (isMounted) {
          setCategories(categoryData as CategoryType[]);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!pathname || categories.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="পণ্যের ক্যাটাগরি"
      className="w-full border-b border-slate-100 bg-white"
    >
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
          // সঠিক template literal
          const categoryPath = `/category/${category.slug}`;

          const isActive =
            pathname === categoryPath ||
            pathname.startsWith(`${categoryPath}/`);

          return (
            <Link
              key={category.id}
              href={categoryPath}
              aria-current={isActive ? "page" : undefined}
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
