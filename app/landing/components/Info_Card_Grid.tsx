"use client";

import { motion } from "framer-motion";
import { InfoCard } from "./Info_Card";
import { INFO_CARDS_DATA } from "../utils/landing_constants";

export function InfoCardGrid() {
  return (
    <>
      {/* Desktop Cards */}
      {INFO_CARDS_DATA.map((card) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, x: card.position.includes("left") ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: card.delay }}
          className={`hidden lg:block absolute ${card.position}`}
        >
          <InfoCard
            title={card.title}
            
            delay={card.animationDelay}
            titleStyle={card.titleStyle}
            descriptionStyle={card.descriptionStyle}
            fontFamily={card.fontFamily}
          />
        </motion.div>
      ))}

      {/* Mobile Cards */}
      <div className="lg:hidden flex flex-col gap-4 mt-12 max-w-md mx-auto">
        {INFO_CARDS_DATA.slice(0, 2).map((card) => (
          <InfoCard
            key={card.id}
            title={card.title}
            
            delay={card.animationDelay + 0.7}
            titleStyle={card.titleStyle}
            descriptionStyle={card.descriptionStyle}
            fontFamily={card.fontFamily}
          />
        ))}
      </div>
    </>
  );
}
