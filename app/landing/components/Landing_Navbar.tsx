"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Menubar, MenubarMenu } from "@/common/components/organism/menubar";
import { WHATSAPP_CONFIG } from "../utils/landing_constants";
import { useWhatsApp } from "../hooks/use_WhatsApp";

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const { openWhatsApp } = useWhatsApp({
    phoneNumber: WHATSAPP_CONFIG.phoneNumber,
    defaultMessage: WHATSAPP_CONFIG.defaultMessage,
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white backdrop-blur-xl shadow-sm" : "bg-white backdrop-blur-md"
      }`}
    >
      <div className="w-full px-4 sm:px-0 lg:px-12 ">
        <Menubar className={`flex items-center justify-between px-0 sm:max-w-375 sm:mx-auto border-none shadow-none transition-all duration-300 py-4 sm:py-3`}>
          {/* Logo */}
          <MenubarMenu>
            <div className="flex items-center shrink-0 -ml-6 sm:ml-0">
              <Image
                src="/toppingfly.webp"
                alt="ToppingFly Logo"
                width={200}
                height={50}
                priority
                className="object-contain"
              />
            </div>
          </MenubarMenu>

          {/* Centered Navigation Links */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
            {/*<Menubar className="border-none bg-transparent">
              <MenubarMenu>
                <Link href="/" className="px-3 py-2">
                  Planes
                </Link>
              </MenubarMenu>

              <MenubarMenu>
                <Link href="/" className="px-3 py-2">
                  Recursos
                </Link>
              </MenubarMenu>

              <MenubarMenu>
                <Link href="/" className="px-3 py-2">
                  Nosotros
                </Link>
              </MenubarMenu>
            </Menubar>*/}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 pr-0 sm:pr-0">
            {/* CTA Button */}
            <MenubarMenu>
              <a 
                href="/auth"
                className="hover:text-orange-600 px-3 sm:px-7 py-3 text-sm transition-all flex items-center gap-2 text-orange-400 font-medium"
              >
                Ingresar
              </a>
            </MenubarMenu>
            {/* WhatsApp Button */}
            <MenubarMenu>
              <button
                onClick={() => openWhatsApp()}
                className="bg-orange-500 hover:bg-orange-600 border border-orange-600 px-4 sm:px-7 py-2.5 sm:py-3 rounded-lg text-sm transition-all flex items-center gap-2 text-white font-medium"
                aria-label="Contactar por WhatsApp"
              >
                <span className="hidden sm:inline">Solicitar registro</span>
                <span className="sm:hidden">Registro</span>
              </button>
            </MenubarMenu>
          </div>
        </Menubar>
      </div>
    </motion.nav>
  );
}
