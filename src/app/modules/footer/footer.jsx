"use client";
import { Separator } from "@/app/shared/ui/separator";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-white">
      <div className="footer-wrapper max-w-[1440px] p-5 mx-auto">
        <div className="footer-top-section flex flex-wrap gap-3 items-center justify-between">
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="header-logo logo cursor-pointer font- text-xl font-bold md:text-2xl flex items-center gap-1"
          >
            <Image src={"/logo.svg"} alt="logo" width={50} height={50} />
            Перевоз.OFF
          </div>
          <p>perevoz.off@2025. Все права защищены</p>
          <nav className="flex items-center gap-3">
            <Link
              className="transition-all hover:scale-110"
              href={"https://youtube.com"}
            >
              <FaYoutube />
            </Link>
            <Link
              className="transition-all hover:scale-110"
              href={"https://facebook.com"}
            >
              <FaFacebook />
            </Link>
            <Link
              className="transition-all hover:scale-110"
              href={"https://x.com"}
            >
              <FaTwitter />
            </Link>
            <Link
              className="transition-all hover:scale-110"
              href={"https://instagram.com"}
            >
              <FaInstagram />
            </Link>
            <Link
              className="transition-all hover:scale-110"
              href={"https://linkedin.com"}
            >
              <FaLinkedin />
            </Link>
          </nav>
        </div>
        <Separator className="opacity-10 my-5" />
        <div className="footer-bottom-section">
          <p className="text-xs text-right">
            Информация на сайте не является публичной офертой
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
