import { Categories, Items } from "../types/menu";
import { CategorySection } from "./Category_Section";

interface MenuContentProps {
  categories: Categories[];
  primaryColor?: string;
  secondaryColor?: string;
  onItemClick: (item: Items) => void;
}

export function MenuContent({
  categories,
  primaryColor,
  secondaryColor,
  onItemClick,
}: MenuContentProps) {
  return (
    <div
      className="grow pb-20"
      style={{ backgroundColor: primaryColor }}
    >
      <main className="max-w-xl mx-auto px-4 py-6 space-y-8">
        {categories.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            onItemClick={onItemClick}
          />
        ))}
      </main>
    </div>
  );
}