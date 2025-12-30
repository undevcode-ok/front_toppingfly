import React, { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/common/components/organism/dialog";
import { X } from "lucide-react";
import { NewCategoryField } from "./New_Category_Field";

export interface InfoDialogProps {
  menuId: number;
  children: ReactNode;
  onSuccess?: () => void;
}

export const NewCategoryDialog = ({ children, menuId, onSuccess }: InfoDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto [&>button]:hidden">
        <DialogHeader>
          <div className="relative flex items-center justify-center">
            <DialogTitle className="text-xl font-semibold text-black">
              Crear Categoria
            </DialogTitle>
            <DialogClose className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/70">
              <X className="h-5 w-5 text-orange-400" />
            </DialogClose>
          </div>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <NewCategoryField menuId={menuId} onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
};