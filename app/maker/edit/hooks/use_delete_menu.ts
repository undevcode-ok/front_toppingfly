import { deleteMenuService } from '../services/delete_menu_service';
import { useState } from 'react';
import { toast } from 'sonner';

export const useDeleteMenu = (router: any) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteMenu = async (menuId: number) => {
    setIsDeleting(true);

    try {
      await deleteMenuService(menuId);
      toast.success("¡Listo! El menú se eliminó correctamente. Continúa gestionando tus menús.");
      router.push("/home");
    } catch (err) {
      toast.error("No pudimos eliminar el menú en este momento. Por favor, intenta nuevamente.");
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteMenu,
    isDeleting,
  };
};