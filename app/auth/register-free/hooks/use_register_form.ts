// control del react-hook-form: valores, errores, envío del formulario de registro free
import { registerFreeForm } from "../types/register_free";
import { handleRegisterFreeSubmit } from "./handlers";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { validations } from "../utils/validate_form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useRegisterForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validations),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      cel: "",
      password: "",
      confirmationPassword: "",
    },
  });

  const onSubmit = async (form: registerFreeForm) => {
    await handleRegisterFreeSubmit(form, router);
  };

  return { register, handleSubmit, errors, onSubmit, isSubmitting };
};