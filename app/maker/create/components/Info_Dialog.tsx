import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/common/components/organism/dialog";
import { InfoDialogProps } from "../types/info_dialog_props";
import { InfoField } from "./Info_Field";
//import { ReactNode } from "react";
import { X } from "lucide-react";


export const InfoDialog = ({ children }: InfoDialogProps) => {
  return (
    <Dialog>
      {/* Esto muestra el botón que abre el diálogo */}
      {children}
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto [&>button]:hidden">
        <DialogHeader>
          <div className="relative flex items-center justify-center">
            <DialogTitle className="text-xl font-semibold text-black">
              Crear Menú
            </DialogTitle>
            <DialogClose className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-white/70">
              <X className="h-5 w-5 text-orange-400" />
            </DialogClose>
          </div>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {/*aqui va el field */}
        <InfoField />
        {/* Aquí agregas el contenido que necesites */}
      </DialogContent>
    </Dialog>
  );
};
