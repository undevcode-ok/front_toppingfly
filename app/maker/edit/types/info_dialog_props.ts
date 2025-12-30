import { ReactNode } from "react";
import { Menu } from "@/app/menu/types/menu";

export interface InfoDialogProps {
  menuData: Menu | null;
  children: ReactNode;
}