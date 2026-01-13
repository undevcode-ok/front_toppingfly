"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/common/components/atoms/button";
import { Check } from "lucide-react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CategoryFormData } from "../../utils/validate_category_form";

interface CategoryTitleProps {
  register: UseFormRegister<CategoryFormData>;
  errors: FieldErrors<CategoryFormData>;
  showSaveButton: boolean;
  onSave: () => void;
  onFocus: () => void;
  onBlur: () => void;
  isSubmitting: boolean;
  isDragging: boolean;
}

export const CategoryTitle: React.FC<CategoryTitleProps> = ({
  register,
  errors,
  showSaveButton,
  onSave,
  onFocus,
  onBlur,
  isSubmitting,
  isDragging,
}) => {

  // Estado para saber si estamos editando
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleFocus = () => {
    setIsEditing(true);
    onFocus();
  };

  const handleBlur = () => {
    setIsEditing(false);
    onBlur();
  };

  // Estilo del cursor
  const cursorStyle = isDragging ? 'grabbing' : isEditing ? 'text' : 'grab';

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center gap-2 w-full">
        {/* Input editable con diseño moderno */}
        <input
          type="text"
          {...register("title")}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClick={handleClick}
          className={`
            w-full min-w-0 px-2 py-1.5 
            font-semibold text-slate-700 
            rounded-lg
            transition-all duration-200
            truncate focus:outline-none
            ${isDragging 
              ? 'bg-transparent border-transparent' 
              : isEditing
                ? 'bg-orange-50 border-2 border-orange-400 shadow-sm'
                : 'bg-transparent border-2 border-transparent hover:bg-slate-50'
            }
          `}
          maxLength={50}
          placeholder="Nombre de categoría"
          disabled={isSubmitting}
          style={{ cursor: cursorStyle }}
        />

        {/* Botón de guardar */}
        <AnimatePresence>
          {showSaveButton && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                duration: 0.2,
                ease: [0.4, 0.0, 0.2, 1],
              }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-emerald-600 hover:bg-emerald-50 hover:scale-105 transition"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onSave();
                }}
                type="button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="h-4 w-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};