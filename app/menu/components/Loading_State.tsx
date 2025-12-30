import { motion } from "framer-motion";
import { Card } from "@/common/components/organism/card";
import { Spinner } from "@/common/components/atoms/spinner";
import { UtensilsCrossed } from "lucide-react";

export function LoadingState() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-white via-[#FFF3EC] to-[#FFE6D3] backdrop-blur-xl bg-white/60 border border-white/30 shadow-[0_8px_24px_rgba(0,0,0,0.08)] p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center text-center space-y-4"
      >
        <Card className="w-20 h-20 rounded-full shadow-lg flex items-center justify-center mb-4">
          <Spinner className="w-12 h-12 text-orange-500" />
        </Card>

        <p className="text-lg text-muted-foreground">
          Estamos dirigiéndote a tu menú. Por favor, espera un momento...
        </p>

        <div className="mt-4 text-sm text-gray-500">
          Este proceso puede tardar unos segundos.
        </div>
        <div className="mt-4 text-sm text-gray-500">Gracias por usar</div>
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-xl bg-linear-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-md">
            <UtensilsCrossed className="w-8 h-8 text-white" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}