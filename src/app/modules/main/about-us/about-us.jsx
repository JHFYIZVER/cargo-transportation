import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/shared/ui/card";
import CustomSubTitle from "@/app/shared/ui/custom-sub-title";
import Image from "next/image";
const AboutUs = () => {
  return (
    <section className="px-5 py-20 text-white">
      <CustomSubTitle text={"О компании"} />
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between mt-10">
        <p className="max-w-xl md:text-lg">
          «Перевоз.off» — это команда профессионалов, которая с 2013 года
          организует быстрые и безопасные грузоперевозки любого уровня
          сложности. Наш автопарк — это современные автомобили от газелей до
          фур, готовые к перевозке грузов от 1 кг до 20 тонн. «Перевоз.off» —
          ваш надежный партнер в грузоперевозках!
        </p>
        <div className="bg-[#282A2D] w-full p-10 grid grid-cols-1 text-center sm:grid-cols-2">
          <Card className="group hover:bg-primary transition-colors duration-300 border-none max-h-40">
            <CardHeader>
              <CardTitle className="text-[#2F343A] transition-colors duration-300 font-bold text-3xl md:text-4xl lg:text-5xl group-hover:text-white">
                340
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-black text-base md:text-base group-hover:text-white transition-colors duration-300">
                <p>сотрудников</p>
                <p>профессионалов</p>
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="group hover:bg-primary transition-colors duration-300 border-none max-h-40">
            <CardHeader>
              <CardTitle className="text-[#2F343A] transition-colors duration-300 font-bold text-3xl md:text-4xl lg:text-5xl group-hover:text-white">
                68
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-black text-base md:text-base group-hover:text-white transition-colors duration-300">
                <p>грузовиков Volvo,</p>
                <p>Scania</p>
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="border-none p-0 max-h-40 flex items-center justify-center">
            <Image
              src={"/about-us.jpg"}
              alt="about-us"
              width={200}
              height={200}
              className="object-cover w-full h-full"
            />
          </Card>
          <Card className="group hover:bg-primary transition-colors duration-300 border-none max-h-40">
            <CardHeader>
              <CardTitle className="text-[#2F343A] transition-colors duration-300 font-bold text-3xl md:text-4xl lg:text-5xl group-hover:text-white">
                1500+
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-black text-base md:text-base group-hover:text-white transition-colors duration-300">
                <p>рейсов</p>
                <p>ежегодно</p>
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
