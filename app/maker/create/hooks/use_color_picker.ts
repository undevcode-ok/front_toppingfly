//controlador de cambio de input de color picker
"use client";

import { useState } from "react";

type ActiveColorField = "primary" | "secondary";

export const useColorPicker = () => {
  const [activeColorField, setActiveColorField] =
    useState<ActiveColorField>("primary");
  return {
    activeColorField,
    setActiveColorField,
  };
};
