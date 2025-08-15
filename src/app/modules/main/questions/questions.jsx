import { Button } from "@/app/shared/ui/button";
import CustomSubTitle from "@/app/shared/ui/custom-sub-title";
import { Input } from "@/app/shared/ui/input";
import React from "react";

const Questions = () => {
  return (
    <section className="px-5 py-20 text-white mt-10 bg-[#282A2D] space-y-6">
      <CustomSubTitle text={"ОСТАЛИСЬ ВОПРОСЫ?"} />
      <p className="mt-5">
        Оставьте свои контактные данные, и мы презвоним вам в ближайшее время
      </p>
      <form className="flex flex-wrap items-end gap-2 mt-5">
        <label className="flex flex-col max-w-80 w-full">
          <span>Имя</span>
          <Input className="w-full py-6" placeholder="Иван Иванов" />
        </label>
        <label className="flex flex-col max-w-80 w-full">
          <span>Номер телефона</span>
          <Input className="w-full py-6" placeholder="+7 (xxx) xxx-xx-xx" />
        </label>
        <Button className="cursor-pointer px-10 py-6">Отправить</Button>
      </form>
      <p>
        Нажимая на кнопку отправить Вы соглашаетесь на обработку Ваших
        персональных данных компание ООО «Перевоз.off»
      </p>
    </section>
  );
};

export default Questions;
