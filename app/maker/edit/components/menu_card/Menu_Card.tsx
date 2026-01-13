"use client";

import { Card } from "@/common/components/organism/card";
import { Button } from "@/common/components/atoms/button";
import { Plus } from "lucide-react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { NewCategoryDialog } from "./New_Category_Dialog";
import { Menu } from "@/app/home/types/menu";
import CategoryList from "./Category_List";
import { useState, useEffect, useCallback } from "react";
import { getMenuId } from "../../services/menu";
import { motion } from "framer-motion";

interface MenuCardProps {
  menuData: Menu;
}

export const MenuCard = ({ menuData: initialMenuData }: MenuCardProps) => {
  const [menuData, setMenuData] = useState<Menu>(initialMenuData);
  const [isRefetching, setIsRefetching] = useState(false);
  const [expandedCategoryId, setExpandedCategoryId] = useState<number | null>(null);

  const refetchMenu = useCallback(async () => {
    if (!initialMenuData?.id) return;
    
    // Guardar el ID de la categoría expandida antes del refetch
    const categoryToKeepOpen = expandedCategoryId;
    
    setIsRefetching(true);
    try {
      const updatedMenu = await getMenuId(initialMenuData.id);
      setMenuData(updatedMenu);
      
      // Restaurar la categoría expandida después del refetch
      // Solo si la categoría aún existe en el menú actualizado
      if (categoryToKeepOpen) {
        const categoryExists = updatedMenu.categories.some(
          cat => cat.id === categoryToKeepOpen
        );
        if (categoryExists) {
          // Usar setTimeout para asegurar que el estado se actualice después del render
          setTimeout(() => {
            setExpandedCategoryId(categoryToKeepOpen);
          }, 0);
        } else {
          setExpandedCategoryId(null);
        }
      }
    } catch (error) {
      console.error("Error al refrescar menú:", error);
    } finally {
      setIsRefetching(false);
    }
  }, [initialMenuData?.id, expandedCategoryId]);

  useEffect(() => {
    if (initialMenuData) {
      setMenuData(initialMenuData);
    }
  }, [initialMenuData]);

  if (!menuData) {
    return null;
  }

  return (
    <motion.div
      className="w-full sm:max-w-xl px-6 pt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl shadow-md p-6 w-full mx-auto">
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <p className="text-base font-medium text-slate-500 uppercase tracking-wider mb-0 ml-1">
              Menú
            </p>
            <div className="shrink-0">
              <NewCategoryDialog menuId={menuData.id} onSuccess={refetchMenu}>
                <DialogTrigger asChild>
                  <Button
                    size="icon"
                    className="bg-orange-500 text-white p-2 rounded-lg h-9 w-9 shadow-md hover:bg-orange-600 transition-colors"
                  >
                    <Plus className="w-5! h-5!" />
                  </Button>
                </DialogTrigger>
              </NewCategoryDialog>
            </div>
          </div>

          <div className="space-y-3 mt-4">
            {isRefetching ? (
              <div className="flex justify-center items-center py-4">
                <div className="h-6 w-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <CategoryList 
                categories={menuData.categories} 
                onMenuUpdate={refetchMenu}
                expandedCategoryId={expandedCategoryId}
                setExpandedCategoryId={setExpandedCategoryId}
              />
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};