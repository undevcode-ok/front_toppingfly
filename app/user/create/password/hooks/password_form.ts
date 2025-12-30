// control del react-hook-form, toma los valores del input, los errores de ellos, la espera y por ultimo el envio de ellos.
import { handlePasswordSubmit } from "./handlers";
import { passwordType } from "../types/password";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { validations } from "../utils/validate_form";
import { zodResolver } from "@hookform/resolvers/zod";


export const passwordForm = (token: string) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<passwordType>({
    resolver: zodResolver(validations),
    defaultValues: { password: "", control_password: "" },
  });
  const onSubmit = async (form: passwordType) => {
    await handlePasswordSubmit(form, router, token);
  };
  return { register, handleSubmit, errors, onSubmit, isSubmitting };
};