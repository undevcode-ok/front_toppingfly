import { motion } from "framer-motion";
import { Loader2 } from 'lucide-react';

export const Loader = () => {
    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full h-[calc(100vh-300px)] flex flex-col items-center justify-center text-center"
      >
        <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
        <p className="mt-4 text-slate-600 text-sm">Cargando menús...</p>
      </motion.div>
    );
};

