import Link from "next/link";

interface CategoryType {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = async () => {
  let data: CategoryType[] = [];

  try {
    const res = await fetch(
      "https://api.api-store.workers.dev/api/bazardor/categories",
      {
        cache: "no-store",
      }
    );

    if (res.ok) {
      data = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return (
    <nav className="w-full border-b border-slate-100 bg-white">
      <div
        className="
          mx-auto flex h-[35px] max-w-7xl
          items-center gap-7 overflow-x-auto
          px-4 scrollbar-none
          sm:gap-8 sm:px-6
          lg:px-8
        "
      >
        {data.map((category) => (
          <Link
            key={category.id}
            href={`/${category.slug}`}
            className="
              group flex shrink-0 items-center gap-2
              whitespace-nowrap
              text-[16px] font-medium text-[#26332d]
              transition-colors duration-200
              hover:text-emerald-600
              sm:text-[17px]
            "
          >
            <span
              className="
                flex h-7 w-7 items-center justify-center
                text-[20px]
                transition-transform duration-200
                group-hover:scale-110
              "
            >
              {category.icon}
            </span>

            <span>{category.nameBn}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavLinks;