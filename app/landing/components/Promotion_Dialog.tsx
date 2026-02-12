"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/common/components/organism/dialog";
import { Button } from "@/common/components/atoms/button";
import { X, CheckCircle2, Clock } from "lucide-react";
import { motion } from "framer-motion";

import { useWhatsApp } from "../hooks/use_WhatsApp";
import { WHATSAPP_CONFIG } from "../utils/landing_constants";


// Componente de Countdown Timer
function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg w-16 h-16 flex items-center justify-center shadow-lg">
        <span className="text-2xl font-bold">{value.toString().padStart(2, '0')}</span>
      </div>
      <span className="text-xs text-gray-600 mt-1 font-medium">{label}</span>
    </div>
  );

  return (
    <div className="flex gap-2 justify-center">
      <TimeUnit value={timeLeft.days} label="Días" />
      <div className="flex items-center pb-5 text-orange-500 text-2xl font-bold">:</div>
      <TimeUnit value={timeLeft.hours} label="Horas" />
      <div className="flex items-center pb-5 text-orange-500 text-2xl font-bold">:</div>
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <div className="flex items-center pb-5 text-orange-500 text-2xl font-bold">:</div>
      <TimeUnit value={timeLeft.seconds} label="Seg" />
    </div>
  );
}

export function PromotionDialog() {
  const [open, setOpen] = useState(false);
  
  // Fecha configurable - 20 de febrero de 2026 a las 23:59:59
  const offerEndDate = new Date('2026-02-20T23:59:59');

  const { openWhatsApp } = useWhatsApp({
    phoneNumber: WHATSAPP_CONFIG.phoneNumber,
    defaultMessage: "¡Hola! Quiero aprovechar la oferta de lanzamiento de ToppingFly 🎉",
  });

  useEffect(() => {
    // Abrir el dialog automáticamente después de un pequeño delay
    const timer = setTimeout(() => {
      setOpen(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const features = [
    <>
    <span className="font-bold">Menú listo en menos 24 horas</span> (nosotros lo cargamos).
    </>,
    <>
    <span className="font-bold">Precio congelado por 12 meses</span> (sin aumentos).
    </>,
    <>
    <span className="font-bold">Prueba gratis 7 días.</span> (si no te convence, te devolvemos el dinero).
    </>,
    <>
    <span className="font-bold">Soporte 24/7.</span> (atención siempre disponible).
    </>,
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[750px] p-0 overflow-hidden border-2 border-orange-300 [&>button]:hidden">
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white relative overflow-hidden">
          {/* Patrón de fondo decorativo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
          </div>

          {/* Botón de cerrar */}
          <button
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70  transition-opacity hover:opacity-100 z-10"
          >
            <X className="h-5 w-5 text-white" />
            <span className="sr-only">Cerrar</span>
          </button>

          <DialogHeader className="relative z-10">
            {/* Logo */}
            

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <DialogTitle className="text-2xl md:text-3xl font-bold text-center text-white mb-2">
                🎉 Oferta de Lanzamiento
              </DialogTitle>
              <div className="flex items-center justify-center gap-2 text-orange-100">
                <Clock className="w-4 h-4" />
                <p className="text-sm font-medium">Por tiempo limitado</p>
              </div>
            </motion.div>
          </DialogHeader>
        </div>

        {/* Contenido principal */}
        <div className="p-6 space-y-6">
          {/* Countdown Timer */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <CountdownTimer targetDate={offerEndDate} />
          </motion.div>

          {/* Pricing */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center space-y-2"
          >
            {/* Precio tachado */}
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl font-bold text-gray-400 line-through">
                $30.000
              </span>
              <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-lg font-bold shadow-lg">
                -34%
              </span>
            </div>

            {/* Precio actual */}
            <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              $20.000
            </div>
            
            <p className="text-sm text-gray-500">Precio fijo por mes</p>
          </motion.div>

          {/* Features List */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-orange-50 border border-orange-200 rounded-xl p-5 space-y-3"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-lg leading-relaxed">{feature}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <Button
              onClick={() => {
                setOpen(false);
                openWhatsApp();
              }}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-6 text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-[1.02]"
            >
              <span className="flex items-center justify-center gap-2">
                Aprovechar Oferta por WhatsApp
              </span>
            </Button>
          </motion.div>

          {/* Footer text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="text-center space-y-1"
          >
            <p className="text-xs text-gray-500">
              ⚡ Respuesta inmediata • Sin compromisos
            </p>
            <p className="text-xs text-orange-600 font-semibold">
              ⏰ Esta oferta expira el 20 de Febrero de 2026
            </p>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}