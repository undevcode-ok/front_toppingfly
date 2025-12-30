import {
  Card,
  CardContent,
} from "@/common/components/organism/card";
import { Loader2 } from "lucide-react";
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"] });



export const SkeletonCard = () => {
  return (
    
      <CardContent className="p-10">
        <div className="h-full flex flex-col items-center justify-center text-center min-h-100">
          <div className="flex flex-col items-center gap-8 w-full">
            {/* Spinner glow */}
            <div className="relative">
              <div className="absolute inset-0 w-14 h-14 bg-orange-200/30 rounded-full blur-xl animate-pulse"></div>
              <Loader2 className="relative h-9 w-9 text-orange-500 animate-spin" />
            </div>

            {/* Título + barra de progreso */}
            <div className="w-full max-w-xs space-y-4">
              <h2 className={`${manrope.className} text-2xl font-extrabold text-slate-800 tracking-tight`}>
                Procesando tu solicitud
              </h2>

              {/* Barra de progreso */}
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden shadow-inner">
                <div className="h-full bg-linear-to-r from-orange-500 to-orange-600 rounded-full animate-[loading_2s_ease-in-out_infinite]"></div>
              </div>
            </div>

            {/* Descripción */}
            <p className="text-base text-slate-600 leading-relaxed max-w-xs">
              Por favor esperá mientras completamos el proceso. No cierres
              ni actualices la página.
            </p>
          </div>
        </div>
      </CardContent>
    
  );
};
