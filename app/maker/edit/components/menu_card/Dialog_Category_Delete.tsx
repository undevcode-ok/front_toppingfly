import { Dialog,DialogContent,DialogClose, DialogHeader, DialogTitle,DialogDescription, DialogFooter } from "@/common/components/organism/dialog";
import { Button } from "@/common/components/atoms/button";
import { AlertTriangle, X } from "lucide-react";

   interface DialogDeleteProps {
  handleDeleteMenu: () => void;
  isDeleting: boolean;
}

export const DialogCategoryDelete = ({ handleDeleteMenu, isDeleting }: DialogDeleteProps) => {
    return (
        <DialogContent className="max-w-sm rounded-2xl p-6 shadow-xl [&>button]:hidden">
          <DialogClose className="absolute right-6 top-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground flex! items-center justify-center">
            <X className="h-5 w-5 text-red-600" />
          </DialogClose>

          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              Eliminar Categoria
            </DialogTitle>
          </DialogHeader>

          <DialogDescription className="text-base text-slate-600">
            ¿Estás seguro de que deseas eliminar esta Categoria? Esta acción no se puede deshacer.
          </DialogDescription>

          <DialogFooter className="flex justify-end gap-2 mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>

            <DialogClose asChild>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={handleDeleteMenu}
                disabled={isDeleting}
              >
                {isDeleting ? "Eliminando..." : "Eliminar"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
    );
};

