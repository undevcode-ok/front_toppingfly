// alerta de los errores
import { Alert, AlertDescription } from "@/common/components/atoms/alert";
import { NewMenuFormData } from "../utils/validate_form";
import { FieldErrors } from "react-hook-form";
import { getErrorMessages } from "../hooks/error_msg";
import { useScrollToError } from "../hooks/use_to_scroll_error";

interface ErrorsProps {
  errors: FieldErrors<NewMenuFormData>;
}

export const Errors = ({ errors }: ErrorsProps) => {
  const errorMessages = getErrorMessages(errors);
  const errorRef = useScrollToError(errorMessages.length > 0); 

  if (errorMessages.length === 0) return null;

  return (
    <Alert ref={errorRef} className="bg-red-50 border-red-200">
      <AlertDescription className="text-red-700 space-y-1">
        {errorMessages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </AlertDescription>
    </Alert>
  );
};

