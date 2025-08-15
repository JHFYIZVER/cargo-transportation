import PopularService from "./modules/main/popular-service/popular-service";
import Advantages from "./modules/main/advantages/advantages";
import Questions from "./modules/main/questions/questions";
import AboutUs from "./modules/main/about-us/about-us";
import Hero from "./modules/main/hero/hero";

export default async function Home() {
  return (
    <main className="max-w-[1440px] w-full mx-auto">
      <Hero />
      <PopularService />
      <Advantages />
      <AboutUs />
      <Questions />
    </main>
  );
}
