// boton de crear menu
import { Button } from "@/common/components/atoms/button";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Link from "next/link";

export const CreateMenuButton = () => {
  return (
    <div className="mb-6 flex justify-center lg:justify-start">
      <Link href={"/maker/create"} className="w-full lg:w-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.3 }}
          className="w-full lg:w-auto"
        >
          <Button className="relative w-full sm:w-[90%] lg:w-auto lg:min-w-50 lg:max-w-87.5 bg-linear-to-r from-orange-400 to-orange-500 rounded-2xl p-10 sm:p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl active:scale-[0.98] overflow-hidden shadow-lg text-left">
            <div className="absolute right-0 top-0 bottom-0 w-32 opacity-20 pointer-events-none lg:hidden">
              <div className="w-24 h-24 bg-white rounded-full absolute -right-8 -top-8" />
              <div className="w-20 h-20 bg-white rounded-full absolute right-4 bottom-0" />
            </div>

            <div className="relative z-10 flex items-center justify-start w-full">
              <Plus className="w-8 h-8 text-white mr-3" strokeWidth={3} />
              <p className="text-white text-xl font-semibold">
                Crear nuevo menú
              </p>
            </div>
          </Button>
        </motion.div>
      </Link>
    </div>
  );
};
