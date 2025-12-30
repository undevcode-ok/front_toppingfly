// control del react-hook-form, toma los valores del input, los errores de ellos, la espera y por ultimo el envio de ellos.
import { emailType } from "../types/email";
import { handleEmailSubmit } from "./email_submit";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { validations } from "../utils/validate_form";
import { zodResolver } from "@hookform/resolvers/zod";


export const emailForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validations),
    defaultValues: { email: "" },
  });
  const onSubmit = async (form: emailType) => {
    await handleEmailSubmit(form, router);
  };
  return { register, handleSubmit, errors, onSubmit, isSubmitting };
};
