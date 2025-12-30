// control del react-hook-form, toma los valores del input, los errores de ellos, la espera y por ultimo el envio de ellos.
import { formUser } from "../types/form_user";
import { handleCreateSubmit } from "./create_submit";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { validations } from "../utils/validate_form";
import { zodResolver } from "@hookform/resolvers/zod";

export const createForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validations),
    defaultValues: { name: "", last_name: "",email: "",cel: "", role_id: 2 },
  });
  const onSubmit = async (form: formUser) => {
    await handleCreateSubmit(form, router);
  };
  return { register, handleSubmit, errors, onSubmit, isSubmitting };
};
