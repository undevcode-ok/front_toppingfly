// control del react-hook-form, toma los valores del input, los errores de ellos, la espera y por ultimo el envio de ellos.
import { formState } from "../types/form_state";
import { handleLoginSubmit } from "./handlers";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { validations } from "../utils/validate_form";
import { zodResolver } from "@hookform/resolvers/zod";

export const loginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validations),
    defaultValues: { email: "", password: "" },
  });
  const onSubmit = async (form: formState) => {
    await handleLoginSubmit(form, router);
  };
  return { register, handleSubmit, errors, onSubmit, isSubmitting };
};
