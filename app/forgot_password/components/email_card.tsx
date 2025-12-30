//tarjeta de email de recuperacion
"use client";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/common/components/organism/card";
import { EmailField } from "./email_field";
import Link from "next/link";
import { Manrope } from "next/font/google";
import { UtensilsCrossed, Loader2 } from "lucide-react";
import { SkeletonCard } from "./skeleton";
const manrope = Manrope({ subsets: ["latin"] });

export const EmailCard = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Card className="h-screen sm:h-auto rounded-none sm:rounded-2xl shadow-xl border border-white/40 bg-white/85 flex flex-col justify-center">
      {/* Skeleton de carga */}
      {isSubmitting && (
        <SkeletonCard />
      )}

      {/* Vista normal del formulario - se oculta pero NO se desmonta */}
      <div className={isSubmitting ? "hidden" : ""}>
        <CardHeader className="flex flex-col items-center justify-center text-center pt-2">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-md">
            <UtensilsCrossed className="w-8 h-8 text-white" />
          </div>
          <CardTitle
            className={`${manrope.className} text-2xl sm:text-3xl font-extrabold text-slate-900 pt-2`}
          >
            Recuperar Contraseña
          </CardTitle>
          <CardDescription className="text-slate-600 text-sm sm:text-base mt-1">
            Ingresa tu Email para recibir un correo de recuperacion de
            contraseña
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmailField onSubmittingChange={setIsSubmitting} />
        </CardContent>

        <CardFooter className="flex flex-col items-center gap-3 space-y-1">
          <Link
            href="/auth"
            className="bg-transparent text-orange-500 font-semibold p-0 shadow-none py-6"
          >
            Iniciar Sesion
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
};
