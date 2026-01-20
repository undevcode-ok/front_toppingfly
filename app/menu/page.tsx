// src/features/menu/components/MenuPage.tsx

"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/common/components/atoms/button";
import { ArrowLeft } from "lucide-react";
import { Items } from "./types/menu";
import { isDarkColor } from "./utils/color_utils";

// Feature imports
import { useMenuData } from "./hooks/use_menu_data";
import { useScrollSync } from "./hooks/use_scroll_sync";
import { useCategoryScroll } from "./hooks/use_category_scroll";
import { LoadingState } from "./components/Loading_State";
import { MenuHeader } from "./components/Menu_Header";
import { CategoryNavigation } from "./components/Category_Navegation";
import { MenuContent } from "./components/Menu_Content";
import { ItemDetailDialog } from "./components/Item_Dialog";

function MenuPageContent() {
  const searchParams = useSearchParams();
  const menuId = searchParams.get("id");
  const isPreview = searchParams.get("preview") === "true"; // 👈 NUEVO: Capturamos el parámetro
  const router = useRouter();

  // Estado
  const [activeCategory, setActiveCategory] = useState(1);
  const [isScrolling, setIsScrolling] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Items | null>(null);

  // Hooks personalizados
  const { menu, categories, isLoading, error } = useMenuData(menuId, isPreview); // 👈 MODIFICADO: Pasamos isPreview
  const { scrollToCategory } = useCategoryScroll();

  useScrollSync({
    categories,
    isScrolling,
    onCategoryChange: setActiveCategory,
  });

  // Handlers
  const handleCategoryClick = (categoryId: number) => {
    scrollToCategory(
      categoryId,
      () => {
        setActiveCategory(categoryId);
        setIsScrolling(true);
      },
      () => setIsScrolling(false)
    );
  };

  // Estados de carga
  if (isLoading) {
    return <LoadingState />;
  }

  const isNavbarDark = isDarkColor(menu.color?.primary);

  return (
    <div
      className="w-full min-h-screen flex flex-col"
      style={{ backgroundColor: menu.color?.primary || "#ffffff" }}
    >
      {/* NAVBAR */}
      {isPreview && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
          style={{
            backgroundColor: menu.color?.primary
              ? `${menu.color.primary}B3`
              : "rgba(255, 255, 255, 0.7)",
          }}
        >
          <div className="mx-auto px-4 py-2 flex items-center justify-start">
            {/* 👇 MODIFICADO: Solo mostrar el botón de volver si es preview */}

            <Button
              variant="ghost"
              size="icon"
              className={`rounded-xl transition-colors ${
                isNavbarDark
                  ? "hover:bg-white/10 text-white"
                  : "hover:bg-black/10 text-black"
              }`}
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      )}
      {/* HEADER */}
      <MenuHeader menu={menu} isPreview={isPreview} />

      {/* CATEGORY NAVIGATION */}
      <CategoryNavigation
        categories={categories}
        activeCategory={activeCategory}
        primaryColor={menu.color?.primary}
        secondaryColor={menu.color?.secondary}
        isPreview={isPreview}
        onCategoryClick={handleCategoryClick}
      />

      {/* CONTENT */}
      <MenuContent
        categories={categories}
        primaryColor={menu.color?.primary}
        secondaryColor={menu.color?.secondary}
        onItemClick={setSelectedItem}
      />

      {/* DETAIL DIALOG */}
      {selectedItem && (
        <ItemDetailDialog
          item={selectedItem}
          primaryColor={menu.color?.primary}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <p className="text-lg text-muted-foreground">Cargando menú...</p>
        </div>
      }
    >
      <MenuPageContent />
    </Suspense>
  );
}
