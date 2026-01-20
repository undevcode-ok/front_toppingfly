"use client";

import { motion } from "framer-motion";
import { InfoCard } from "./Info_Card";
import { INFO_CARDS_DATA } from "../utils/landing_constants";

export function InfoCardGrid() {
  return (
    <>
      {/* Desktop Cards - Positioned around phone */}
      {INFO_CARDS_DATA.map((card) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, x: card.position.includes("left") ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: card.delay }}
          className={`hidden lg:block absolute ${card.position}`}
        >
          <InfoCard
            titleImageSrc={card.titleImageSrc}
            titleImageAlt={card.titleImageAlt}
            qrImageSrc={card.qrImageSrc}
            delay={card.animationDelay}
          />
        </motion.div>
      ))}

      {/* Mobile Cards - Stacked in single column */}
      <div className="lg:hidden flex flex-col items-center gap-6 w-full px-4 pt-8">
        {INFO_CARDS_DATA.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 + (index * 0.15) }}
            className="w-full max-w-[280px] mx-auto"
          >
            <InfoCard
              titleImageSrc={card.titleImageSrc}
              titleImageAlt={card.titleImageAlt}
              qrImageSrc={card.qrImageSrc}
              delay={card.animationDelay + 0.7}
            />
          </motion.div>
        ))}
      </div>
    </>
  );
}