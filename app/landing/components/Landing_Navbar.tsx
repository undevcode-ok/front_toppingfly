"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Menubar, MenubarMenu } from "@/common/components/organism/menubar";
import { WHATSAPP_CONFIG } from "../utils/landing_constants";

export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(WHATSAPP_CONFIG.defaultMessage);
    const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`
        fixed top-0 left-0 right-0 z-50 w-full
        transition-all duration-300
        ${
          scrolled
            ? "bg-white/70 backdrop-blur-xl shadow-sm"
            : "bg-white/90 backdrop-blur-md"
        }
      `}
    >
      <div className="w-full px-6 lg:px-12">
        <Menubar className="max-w-7xl mx-auto px-6 lg:px-12 w-full justify-between border-none bg-transparent">
          {/* Logo */}
          <MenubarMenu>
            <div className="flex items-center">
              <Image
                src="/toppingfly.webp"
                alt="ToppingFly Logo"
                width={200}
                height={50}
                priority
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
          <div className="flex items-center gap-3">
            {/* CTA Button */}
            <MenubarMenu>
              <a
                href="/auth"
                className=" hover:text-orange-600   px-7 py-3  text-sm transition-all flex items-center gap-2 text-orange-400 font-medium"
              >
                Ingresar 
              </a>
            </MenubarMenu>
            {/* WhatsApp Button */}
             <MenubarMenu>
              <button
              onClick={handleWhatsAppClick}
              className="bg-orange-500 hover:bg-orange-600 border border-orange-600 px-7 py-3 rounded-lg text-sm transition-all flex items-center gap-2 text-white font-medium"
              aria-label="Contactar por WhatsApp"
            >
              
              <span className="hidden md:inline">Solicitar registro</span>
            </button>
            </MenubarMenu>
          </div>
        </Menubar>
      </div>
    </motion.nav>
  );
}