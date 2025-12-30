import { Categories } from "../types/menu";
import { CategoryButton } from "./Category_Button";
import { useRef, useState } from "react";

interface CategoryNavigationProps {
  categories: Categories[];
  activeCategory: number;
  primaryColor?: string;
  secondaryColor?: string;
  onCategoryClick: (categoryId: number) => void;
  isPreview: boolean;
}

export function CategoryNavigation({
  categories,
  activeCategory,
  primaryColor,
  secondaryColor,
  isPreview,
  onCategoryClick,
}: CategoryNavigationProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const shouldCenter = categories.length < 4;

  return (
    <div
      className={`sticky z-40 backdrop-blur-xl ${isPreview ? 'top-12' : 'top-0'}`}
      style={{
        backgroundColor: primaryColor
          ? `${primaryColor}CC`
          : "rgba(255,255,255,0.8)",
      }}
    >
      <div 
        ref={scrollRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="max-w-xl mx-auto px-4 py-3 overflow-x-auto cursor-grab active:cursor-grabbing select-none"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div className={`flex gap-2 ${shouldCenter ? 'justify-center' : 'min-w-max'}`}>
          {categories.map((cat) => (
            <CategoryButton
              key={cat.id}
              categoryId={cat.id}
              title={cat.title}
              isActive={activeCategory === cat.id}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              onClick={onCategoryClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}