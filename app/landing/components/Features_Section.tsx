"use client";

import { FeatureCard } from "./Feature_Card";
import { Menu, FolderTree, Download, Scan } from "lucide-react";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";

export const FeaturesSection = () => {
  const features = [
    {
      icon: <Menu className="w-10 h-10" />,
      title: "Creación Rápida de Menús",
      description: "Diseña y personaliza tus menús en minutos con nuestra interfaz intuitiva. Sin complicaciones, sin necesidad de conocimientos técnicos."
    },
    {
      icon: <FolderTree className="w-10 h-10" />,
      title: "Categorías y Platos",
      description: "Organiza tu menú con categorías personalizadas. Añade platos, precios, descripciones e imágenes de forma sencilla y ordenada."
    },
    {
      icon: <Download className="w-10 h-10" />,
      title: "Descarga con QR",
      description: "Genera códigos QR únicos para cada menú y descárgalos en alta calidad. Listo para imprimir y colocar en tus mesas."
    },
    {
      icon: <Scan className="w-10 h-10" />,
      title: "Escaneo Instantáneo",
      description: "Tus clientes escanean el QR con su celular y visualizan el menú al instante. Una experiencia moderna y sin contacto."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as any // Forzar tipo
    }
  }
};

  return (
    <section id="features" className="max-w-6xl mx-auto px-4 py-16 scroll-mt-8">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-4">Todo lo que necesitas</h2>
        <p className="text-gray-600 text-lg">
          Funcionalidades diseñadas para restaurantes modernos
        </p>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {features.map((feature, index) => (
          <motion.div key={index} variants={cardVariants}>
            <FeatureCard
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};