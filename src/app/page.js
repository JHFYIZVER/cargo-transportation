import Advantages from "./modules/main/advantages/advantages";
import Hero from "./modules/main/hero/hero";
import PopularService from "./modules/main/popular-service/popular-service";

export default async function Home() {
  return (
    <main className="max-w-[1440px] w-full mx-auto">
      <Hero />
      <PopularService />
      <Advantages />
    </main>
  );
}
