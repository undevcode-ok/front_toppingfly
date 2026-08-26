// tarjeta de registro free
"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/common/components/organism/card";
import { RegisterField } from "./Register_Field";
import { Manrope } from "next/font/google";
import { UtensilsCrossed } from "lucide-react";

const manrope = Manrope({ subsets: ["latin"] });

export const RegisterCard = () => {
  return (
    <Card className="h-screen sm:h-auto sm:max-w-md sm:mx-auto rounded-none sm:rounded-2xl shadow-xl border border-white/40 bg-white/85 flex flex-col justify-start">
      <CardHeader className="flex flex-col items-center justify-center text-center pt-2">
        
        <CardTitle
          className={`${manrope.className} text-2xl sm:text-3xl font-extrabold text-slate-900 pt-2`}
        >
          Crear Cuenta
        </CardTitle>
        <CardDescription className="text-slate-600 text-sm sm:text-base mt-1">
          Registra una nueva cuenta gratis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterField />
      </CardContent>
      <CardFooter className="pt-3 flex flex-col items-center gap-1">
        <p className="text-sm text-slate-500">
          ¿Ya tenés cuenta?{" "}
          <a href="/auth" className="text-orange-500 font-semibold">
            Iniciá sesión
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};