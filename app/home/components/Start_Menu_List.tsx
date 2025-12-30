
import { motion } from "framer-motion";
import { UtensilsCrossed } from 'lucide-react';
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"] });

export const StartMenuList = () => {
    return (
        <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full h-[calc(100vh-300px)] flex flex-col items-center justify-center text-center py-16 px-6 bg-transparent sm:bg-white/50 backdrop-blur-md rounded-3xl sm:shadow-inner sm:border sm:border-white/30"
      >
        <div className="w-16 h-16 mb-4 rounded-full bg-linear-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-md">
          <UtensilsCrossed className="w-8 h-8 text-white" />
        </div>

        <h3
          className={`${manrope.className} text-lg font-bold text-slate-800 mb-2`}
        >
          Aún no tienes menús
        </h3>

        <p className="text-slate-500 text-sm mb-6">
          Crea tu primer menú digital para empezar a personalizarlo.
        </p>
      </motion.div>
    );
};

