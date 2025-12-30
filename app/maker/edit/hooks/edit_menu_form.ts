// hooks/new_menu_form.ts
import { editMenu } from "../types/edit_menu";
import { handleEditMenuSubmit } from "./edit_menu_submit";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { validations, NewMenuFormData } from "../utils/validate_form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Menu } from "@/app/home/types/menu";

export const editMenuForm = (menuData: Menu | null = null) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<NewMenuFormData>({
    resolver: zodResolver(validations),
    defaultValues: {
      title: menuData?.title || "",
      pos: menuData?.pos || "",
      logo: menuData?.logo || undefined,
      backgroundImage: menuData?.backgroundImage || undefined,
      color: {
        primary: menuData?.color.primary || "#D4D4D4",
        secondary: menuData?.color.secondary || "#262626",
      },
    },
  });
  
  const onSubmit = async (formData: NewMenuFormData) => {
    if (!menuData) {
      console.error("No hay datos del menú para actualizar");
      return;
    }

    const values = getValues();

    // Helper function para procesar archivos o mantener URLs existentes
    const processFile = (value: any, fallback: string | undefined) => {
      // Si es FileList con archivo, devolver el archivo
      if (value instanceof FileList && value.length > 0) {
        return value[0];
      }
      // Si es string (URL existente), mantenerlo
      if (typeof value === 'string') {
        return value;
      }
      // Si está vacío, mantener el valor original
      return fallback || null;
    };

    const dataToUpdate: editMenu = {
      id: menuData.id,
      title: formData.title,
      pos: formData.pos || "",
      logo: processFile(values.logo, menuData.logo),
      backgroundImage: processFile(values.backgroundImage, menuData.backgroundImage),
      color: {
        primary: formData.color?.primary && formData.color.primary !== "#" 
          ? formData.color.primary 
          : "#D4D4D4",
        secondary: formData.color?.secondary && formData.color.secondary !== "#"
          ? formData.color.secondary 
          : "#262626",
      },
    };
    
    await handleEditMenuSubmit(dataToUpdate, router);
  };
  
  return { register, handleSubmit, errors, control, onSubmit, isSubmitting };
};