"use client";

import { Check, Sparkles } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { Button } from "@/common/components/atoms/button";
import { useWhatsApp } from "../hooks/use_WhatsApp";
import { WHATSAPP_CONFIG } from "../utils/landing_constants";

const FULL_PLAN_MESSAGE =
    "¡Hola! Quiero saber más sobre el plan Topping Full.";

const freeFeatures = [
    "1 menú activo",
    "Hasta 3 Categorías",
    "Hasta 20 platos",
    "Código QR para tu menú",
    "Sin necesidad de tarjeta",
];

const fullFeatures = [
    "3 Menús activos",
    "Platos ilimitados",
    "Categorías ilimitadas",
    "Logo y fondo personalizados",
    "Fotos de tus platos",
    "Te cargamos tu menú en menos de 24hs",
    
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export const PricingSection = () => {
    const { openWhatsApp } = useWhatsApp({
        phoneNumber: WHATSAPP_CONFIG.phoneNumber,
    });

    return (
        <section id="planes" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-8">
            <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-4xl font-bold mb-4">Elegí tu plan</h2>
                <p className="text-gray-600 text-lg">
                    Empezá gratis y crecé cuando lo necesites
                </p>
            </motion.div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Plan Free */}
                <motion.div variants={cardVariants} className="h-full">
                    <div className="h-full flex flex-col rounded-2xl border-2 border-slate-200 bg-white/80 backdrop-blur-sm p-8 hover:shadow-xl transition-shadow duration-300">
                        <h3 className="text-2xl font-bold text-slate-900">Topping Free</h3>
                        <div className="mt-4 flex items-end gap-1">
                            <span className="text-5xl font-extrabold text-slate-900">
                                $0
                            </span>
                            <span className="text-slate-500 mb-1">/mes</span>
                        </div>
                        <p className="text-slate-500 mt-2">
                            Para empezar a digitalizar tu menú
                        </p>

                        <a href="/auth/register-free" className="mt-6">
                            <Button
                                variant="outline"
                                className="w-full rounded-full border-2 border-slate-300 text-slate-700 hover:bg-slate-50 py-6 text-base font-semibold"
                            >
                                Registrarme gratis
                            </Button>
                        </a>

                        <hr className="my-6 border-slate-200" />

                        <ul className="space-y-3 flex-1">
                            {freeFeatures.map((feature) => (
                                <li
                                    key={feature}
                                    className="flex items-center gap-2 text-slate-600"
                                >
                                    <Check className="w-5 h-5 text-orange-500 shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>

                {/* Plan Full */}
                <motion.div variants={cardVariants} className="h-full">
                    <div className="relative h-full flex flex-col rounded-2xl border-2 border-orange-400 bg-white p-8 shadow-xl overflow-hidden">
                        <div className="absolute top-6 -right-11 w-44 rotate-45 bg-linear-to-r from-orange-400 to-orange-500 text-white text-xs font-bold py-1.5 flex items-center justify-center gap-1 shadow-md">
              
              MÁS POPULAR
            </div>

                        <h3 className="text-2xl font-bold text-slate-900">Topping Full</h3>
                        <div className="mt-4 flex items-end gap-3 flex-wrap">
                            <div className="flex items-end gap-1">
                                <span className="text-5xl font-extrabold text-slate-900">
                                    $20.000
                                </span>
                                <span className="text-slate-500 mb-1">/mes</span>
                            </div>
                            <div className="flex flex-col mb-1">
                                <span className="text-slate-400 line-through text-sm leading-none">
                                    $25.000
                                </span>
                                <span className="text-orange-500 text-xs font-bold leading-none mt-1">
                                    20% OFF
                                </span>
                            </div>
                        </div>
                        <p className="text-slate-500 mt-2">
                            Ideal para negocios en crecimiento
                        </p>

                        <Button
                            onClick={() => openWhatsApp(FULL_PLAN_MESSAGE)}
                            className="mt-6 w-full rounded-full bg-linear-to-r from-orange-400 to-orange-500 text-white hover:shadow-lg py-6 text-base font-semibold"
                        >
                            Elegir plan
                        </Button>

                        <hr className="my-6 border-slate-200" />

                        <ul className="space-y-3 flex-1">
                            {fullFeatures.map((feature, index) => (
                                <li
                                    key={feature}
                                    className="flex items-center gap-2 text-slate-600"
                                >
                                    <Check className="w-5 h-5 text-orange-500 shrink-0" />
                                    <span
                                        className={
                                            index === fullFeatures.length - 1
                                                ? "font-semibold text-slate-800"
                                                : ""
                                        }
                                    >
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};