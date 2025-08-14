"use client";
import { CustomLink } from "@/app/shared/ui/custom-link";
import { FaUser } from "react-icons/fa";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import MenuBar from "../menu/menu";

const Header = () => {
  return (
    <header className="w-full">
      <div className="header-wrapper text-white p-5 mx-auto max-w-[1440px] flex items-center justify-between">
        <Link
          href={"/"}
          className="header-logo logo cursor-pointer font- text-xl font-bold md:text-2xl flex items-center gap-1"
        >
          <Image src={"/logo.svg"} alt="logo" width={50} height={50} />
          Перевоз.OFF
        </Link>
        <nav className="hidden  md:block">
          <ul className="flex items-center text-white gap-6">
            <li>
              <CustomLink
                className={
                  "bg-transparent p-0 hover:bg-transparent relative after:absolute after:w-0 hover:after:w-full after:h-1 after:bg-primary transition-all after:transition-all after:bottom-0 text-lg"
                }
                href={"/"}
              >
                Главная
              </CustomLink>
            </li>
            <li>
              <CustomLink
                className={
                  "bg-transparent p-0 hover:bg-transparent relative after:absolute after:w-0 hover:after:w-full after:h-1 after:bg-primary transition-all after:transition-all after:bottom-0 text-lg"
                }
                href={"/price"}
              >
                Цены
              </CustomLink>
            </li>
            <li>
              <CustomLink
                className={
                  "bg-transparent p-0 hover:bg-transparent relative after:absolute after:w-0 hover:after:w-full after:h-1 after:bg-primary transition-all after:transition-all after:bottom-0 text-lg"
                }
                href={"/autopark"}
              >
                Автопарк
              </CustomLink>
            </li>
            <li>
              <CustomLink
                className={
                  "bg-transparent p-0 hover:bg-transparent relative after:absolute after:w-0 hover:after:w-full after:h-1 after:bg-primary transition-all after:transition-all after:bottom-0 text-lg"
                }
                href={"/contact"}
              >
                Контакты
              </CustomLink>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <Link href={"/profile"}>
            <FaUser className="transition-all hover:scale-110 cursor-pointer" />
          </Link>
          <div className="block md:hidden mr-4">
            <MenuBar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
