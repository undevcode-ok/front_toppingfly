// controladores del registro free

import { registerFreeForm } from "../types/register_free";
import { registerFreeService } from "../services/register_free_service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// visualización de la contraseña (ojo)
export const handleTogglePassword = (
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setShowPassword((eye) => !eye);
};

// petición de registro free
export const handleRegisterFreeSubmit = async (
  formData: registerFreeForm,
  router: ReturnType<typeof useRouter>
) => {
  try {
    await registerFreeService(formData);
    toast.success("¡Cuenta creada con éxito!");
    router.push("/home");
  } catch (error) {
    console.error("Error al crear la cuenta free:", error);

    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("Error inesperado. Intentá nuevamente.");
    }
  }
};