import Banner from "./components/Banner";
import RisersProduct from "./components/RisersProduct";
import FallersProduct from "./components/FallersProduct";
import AllProducts from "./components/AllProducts";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-6 sm:px-6 lg:px-10">
      <Banner />

      <div className="mx-auto mt-6 w-full max-w-[1200px]">
        <RisersProduct />
        <FallersProduct />
        <AllProducts />
      </div>
    </main>
  );
}