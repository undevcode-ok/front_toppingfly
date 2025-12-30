//pagina de renderizado de los menues
"use client";
import { CreateMenuButton } from "./components/Create_Menu_Button";
import { Navbar } from "./components/navbar";
import { Manrope } from "next/font/google";
import { MenuList } from "./components/Menu_List";
import Faq from "./components/Faq";
import { motion } from "framer-motion";

const manrope = Manrope({ subsets: ["latin"] });

const page = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Navbar />
      <div className="flex flex-col justify-center items-center py-8 grow">
        <div className="w-full max-w-7xl mx-auto px-4">
          
            <CreateMenuButton />
          
          <MenuList />
        </div>
        <div className="mt-auto pt-8">
          <Faq />
        </div>
      </div>
    </div>
  );
};

export default page;
