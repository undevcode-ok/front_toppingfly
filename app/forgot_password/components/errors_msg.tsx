// alerta de los errores
import { Alert, AlertDescription } from '@/common/components/atoms/alert';
import { emailType } from '../types/email';
import { FieldErrors } from 'react-hook-form';


interface ErrorsProps {
  errors: FieldErrors<emailType>;
}

const Errors = ({ errors }: ErrorsProps) => {
    const errorMessages = Object.values(errors);
    if (errorMessages.length === 0) return null;
    return (
        <Alert className=" bg-red-50  border-red-200">
              <AlertDescription className=" text-red-700 space-y-1">
                {errorMessages.map((error, index) => (
                  <p key={index}>{error.message}</p>
                ))}
              </AlertDescription>
            </Alert>
    );
};

export default Errors;