"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/common/components/organism/card";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
     <motion.div
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="h-full"
    >
      <Card className="border-2 hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm h-full">
        <CardHeader>
          <motion.div 
            className="w-16 h-16 bg-linear-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center mb-4 text-white"
            whileHover={{ 
              scale: 1.15,
              transition: { duration: 0.2, ease: "easeOut" }
            }}
          >
            {icon}
          </motion.div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-600 text-base">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
};