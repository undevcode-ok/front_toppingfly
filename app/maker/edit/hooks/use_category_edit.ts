import { useState } from "react";

export const useCategoryEdit = (categoryId: number, originalTitle: string) => {
  const [localTitle, setLocalTitle] = useState(originalTitle);
  const [isFocused, setIsFocused] = useState(false);

  const hasChanged = localTitle !== originalTitle;
  const isValidTitle = localTitle.length > 3 && localTitle.length < 41;
  const showSaveButton = isFocused && isValidTitle && hasChanged;

  const handleFocus = () => setIsFocused(true);
  
  const handleBlur = () => {
    setIsFocused(false);
    if (hasChanged) {
      setLocalTitle(originalTitle);
    }
  };

  return {
    localTitle,
    setLocalTitle,
    isFocused,
    hasChanged,
    showSaveButton,
    handleFocus,
    handleBlur,
  };
};