export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f4f6f4] px-4 py-6 sm:px-6 lg:px-8 font-['Hind_Siliguri',sans-serif]">
      <div className="mx-auto max-w-6xl space-y-4">
        
        {/* Category Header Banner Skeleton */}
        <div className="flex animate-pulse items-center gap-4 rounded-2xl border border-[#e1e9e2] bg-white p-5 shadow-sm">
          <div className="h-14 w-14 shrink-0 rounded-full bg-[#e8efe9]" />
          <div className="space-y-2">
            <div className="h-6 w-36 rounded-md bg-[#e8efe9]" />
            <div className="h-4 w-48 rounded-md bg-[#e8efe9]" />
          </div>
        </div>

        {/* Filter / Sort Control Bar Skeleton */}
        <div className="flex animate-pulse items-center justify-end gap-2 rounded-2xl border border-[#e1e9e2] bg-white px-4 py-3 shadow-sm">
          <div className="h-4 w-12 rounded bg-[#e8efe9]" />
          <div className="h-8 w-24 rounded-lg bg-[#e8efe9]" />
        </div>

        {/* Status Count Text Skeleton */}
        <div className="px-1 pt-1">
          <div className="h-4 w-40 rounded bg-[#e8efe9] animate-pulse" />
        </div>

        {/* Product Cards Grid Skeleton */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex min-h-[113px] animate-pulse flex-col justify-between rounded-[14px] border border-[#e1e9e2] bg-[#fbfdfc] p-3"
            >
              {/* Top Row: Icon + Title */}
              <div className="flex items-center gap-2.5">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-[#e8efe9]" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-[#e8efe9]" />
                  <div className="h-3 w-1/2 rounded bg-[#e8efe9]" />
                </div>
              </div>

              {/* Bottom Row: Price + Badge */}
              <div className="mt-4 flex items-end justify-between">
                <div className="space-y-1.5">
                  <div className="h-3 w-16 rounded bg-[#e8efe9]" />
                  <div className="h-5 w-20 rounded bg-[#e8efe9]" />
                </div>
                <div className="h-5 w-14 rounded-full bg-[#e8efe9]" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}