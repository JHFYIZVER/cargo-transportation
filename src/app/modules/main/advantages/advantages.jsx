import CustomSubTitle from "@/app/shared/ui/custom-sub-title";
import {
  Card,
  CardContent,
  CardDescription,
} from "@/app/shared/ui/card";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdOutlineSecurity } from "react-icons/md";
import { BiSolidTimer } from "react-icons/bi";
import { FaPeopleCarry } from "react-icons/fa";
const Advantages = () => {
  return (
    <section className="px-5 py-20 text-white mt-10 bg-[#282A2D]">
      <CustomSubTitle text={"наши преимущества"} />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4 mt-10">
        <Card className="group text-center shadow-none hover:bg-primary transition-colors duration-300 border-none">
          <div className="rounded-full size-15 mx-auto bg-primary group-hover:bg-white transition-colors duration-300 flex items-center justify-center">
            <FaPeopleCarry className="size-8" />
          </div>
          <CardContent>
            <CardDescription className="text-black text-base md:text-base group-hover:text-white transition-colors duration-300 uppercase font-black">
              5 000+ перевозок
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="group text-center shadow-none hover:bg-primary transition-colors duration-300 border-none">
          <div className="rounded-full size-15 mx-auto bg-primary group-hover:bg-white transition-colors duration-300 flex items-center justify-center">
            <BiSolidTimer className="size-8" />
          </div>
          <CardContent>
            <CardDescription className="text-black text-base md:text-base group-hover:text-white transition-colors duration-300 uppercase font-black">
              10 лет на рынке
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="group text-center shadow-none hover:bg-primary transition-colors duration-300 border-none">
          <div className="rounded-full size-15 mx-auto bg-primary group-hover:bg-white transition-colors duration-300 flex items-center justify-center">
            <MdOutlineSecurity className="size-8" />
          </div>
          <CardContent>
            <CardDescription className="text-black text-base md:text-base group-hover:text-white transition-colors duration-300 uppercase font-black">
              Страховка
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="group text-center shadow-none hover:bg-primary transition-colors duration-300 border-none">
          <div className="rounded-full size-15 mx-auto bg-primary group-hover:bg-white transition-colors duration-300 flex items-center justify-center">
            <RiMoneyDollarCircleFill className="size-8!" />
          </div>
          <CardContent>
            <CardDescription className="text-black text-base md:text-base group-hover:text-white transition-colors duration-300 uppercase font-black">
              Выгода
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Advantages;
