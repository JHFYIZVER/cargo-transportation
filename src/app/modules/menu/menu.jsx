"use client";

import React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "@/app/shared/ui/sheet";
import Image from "next/image";

const MenuBar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="cursor-pointer">
        <Menu />
      </SheetTrigger>
      <SheetContent side="right" className="overflow-y-auto">
        <SheetHeader className="mb-10">
          <SheetTitle asChild>
            <SheetClose asChild>
              <Link
                href={"/"}
                className="header-logo text-white cursor-pointer text-xl font-black md:text-2xl flex items-center gap-1"
              >
                <Image src={"/logo.svg"} alt="logo" width={50} height={50} />
                Перевоз.OFF
              </Link>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col items-start px-4"></div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuBar;
