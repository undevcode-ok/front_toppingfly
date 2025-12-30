//tarjeta de crear usuario
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/common/components/organism/card";
import { CreateField } from "./Create_Field";
import { Manrope } from "next/font/google";


const manrope = Manrope({ subsets: ["latin"] });

export const CreateCard = () => {
  

  return (
    <Card className="h-screen sm:h-auto sm:max-w-md sm:mx-auto rounded-none sm:rounded-2xl shadow-xl border border-white/40 bg-white/85 flex flex-col justify-start">
      <CardHeader className="flex flex-col items-center justify-center text-center pt-2">
        <CardTitle
          className={`${manrope.className} text-2xl sm:text-3xl font-extrabold text-slate-900 pt-2`}
        >
          Crear Cuenta
        </CardTitle>
        <CardDescription className="text-slate-600 text-sm sm:text-base mt-1">
          Registra un nuevo usuario
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-14 sm:pt-0">
        <CreateField />
      </CardContent>
    </Card>
  );
};