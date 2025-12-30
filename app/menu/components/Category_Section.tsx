import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/common/components/organism/card";
import { Categories, Items } from "../types/menu";
import { FoodMenuItem } from "./Food_Menu_Item";
import { isDarkColor } from "../utils/color_utils";

interface CategorySectionProps {
  category: Categories;
  primaryColor?: string;
  secondaryColor?: string;
  onItemClick: (item: Items) => void;
}

export function CategorySection({
  category,
  primaryColor,
  secondaryColor,
  onItemClick,
}: CategorySectionProps) {
  const sortedItems = category.items
    ? [...category.items].sort((a, b) => a.position - b.position)
    : [];

  const isDark = isDarkColor(primaryColor);

  return (
    <section id={category.id.toString()}>
      <div className="mb-6">
        <h2
          className="text-2xl font-semibold tracking-wide"
          style={{ color: secondaryColor }}
        >
          {category.title}
        </h2>
        <div
          className="mt-2 w-full rounded-full"
          style={{
            height: "3px",
            backgroundColor: `${secondaryColor}AA`,
          }}
        />
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {sortedItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <Card
                className={`rounded-2xl border shadow-sm shadow-black/5 transition-all cursor-pointer ${
                  isDark
                    ? "bg-neutral-900 border-neutral-700 active:scale-[0.97]"
                    : "bg-white border-neutral-200 active:scale-[0.97]"
                }`}
                onClick={() => onItemClick(item)}
              >
                <CardContent className="p-4">
                  <FoodMenuItem {...item} primaryColor={primaryColor} />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
