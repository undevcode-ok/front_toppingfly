

import { Loader2 } from "lucide-react";
import { Manrope } from "next/font/google";
import { motion } from "framer-motion";

const manrope = Manrope({ subsets: ["latin"] });

export const Loader = () => {
  return (
    <motion.div
      className="min-h-screen w-full flex items-center justify-center bg-slate-50"
      initial={{ opacity: 0 }}  // Empieza invisible
      animate={{ opacity: 1 }}  // Se vuelve visible
      exit={{ opacity: 0 }}    // Se desvanecerá al salir
      transition={{ duration: 0.5 }}  // Duración de la animación
    >
      <div className="flex flex-col items-center gap-8 w-full max-w-md px-6">
        {/* Spinner glow */}
        <div className="relative">
          <div className="absolute inset-0 w-14 h-14 bg-orange-200/30 rounded-full blur-xl animate-pulse"></div>
          <Loader2 className="relative h-9 w-9 text-orange-500 animate-spin" />
        </div>

        {/* Título + barra de progreso */}
        <div className="w-full space-y-4">
          <h2
            className={`${manrope.className} text-2xl font-extrabold text-slate-800 tracking-tight text-center`}
          >
            Cargando tu menú para editar
          </h2>

          {/* Barra de progreso */}
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden shadow-inner">
            <div className="h-full bg-linear-to-r from-orange-500 to-orange-600 rounded-full animate-[loading_2s_ease-in-out_infinite]"></div>
          </div>
        </div>

        {/* Descripción */}
        <p className="text-base text-slate-600 leading-relaxed text-center">
          Estamos preparando todo para que puedas editar tu menú. Esto tomará
          solo un momento, por favor, no cierres ni actualices la página.
        </p>
      </div>
    </motion.div>
  );
};
