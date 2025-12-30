// hooks/new_menu_form.ts
import { newMenu } from "../types/new_menu";
import { handleNewMenuSubmit } from "./new_menu_submit";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { validations, NewMenuFormData } from "../utils/validate_form";
import { zodResolver } from "@hookform/resolvers/zod";

export const newMenuForm = () => {
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
      title: "",
      pos: "",
      logo: undefined,
      backgroundImage: undefined,
      color: {
        primary: "#D4D4D4",
        secondary: "#262626",
      },
    },
  });
  
  const onSubmit = async (formData: NewMenuFormData) => {
    const values = getValues();
    const dataToSubmit: newMenu = {
    title: formData.title,
    pos: formData.pos || "",
    logo: values.logo?.[0] || null,
    backgroundImage: values.backgroundImage?.[0] || null,
    color: {
      primary: formData.color?.primary && formData.color.primary !== "#" 
        ? formData.color.primary 
        : "#D4D4D4",
      secondary: formData.color?.secondary && formData.color.secondary !== "#"
        ? formData.color.secondary 
        : "#262626",
    },
  };
    
    await handleNewMenuSubmit(dataToSubmit, router);
  };
  
  return { register, handleSubmit, errors, control, onSubmit, isSubmitting };
};