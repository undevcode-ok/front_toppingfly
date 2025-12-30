//tarjeta de cambio de contraseña
"use client"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/common/components/organism/card";
import { Manrope } from "next/font/google";
import { PasswordField } from "./Password_Create_Field";
import { UtensilsCrossed } from "lucide-react";
import { SkeletonCard } from "./skeleton";
import { useState } from "react";

const manrope = Manrope({ subsets: ["latin"] });

export const PasswordCreateCard = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Card className="h-screen sm:h-auto rounded-none sm:rounded-2xl shadow-xl border border-white/40 bg-white/85 flex flex-col justify-center">
      {isSubmitting && <SkeletonCard />}
      <div className={isSubmitting ? "hidden" : ""}>
        <CardHeader className="flex flex-col items-center justify-center text-center pt-2">
          <div className="w-16 h-16 rounded-xl bg-linear-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-md">
            <UtensilsCrossed className="w-8 h-8 text-white" />
          </div>
          <CardTitle
            className={`${manrope.className} text-2xl sm:text-3xl font-extrabold text-slate-900 pt-2`}
          >
            Creando Contraseña
          </CardTitle>
          <CardDescription className="text-slate-600 text-sm sm:text-base mt-1">
            Ingresa una contraseña segura para tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PasswordField onSubmittingChange={setIsSubmitting}/>
        </CardContent>

        <CardFooter className=" flex flex-col items-center gap-3 space-y-1 "></CardFooter>
      </div>
    </Card>
  );
};
