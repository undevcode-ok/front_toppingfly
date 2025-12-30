//tarjeta del login
"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/common/components/organism/card";
import { InstagramIcon } from "@/public/svg/instagram";
import { LoginField } from "./login_field";
import { Manrope } from "next/font/google";
import { TiktokIcon } from "@/public/svg/tiktok";
import { UtensilsCrossed } from "lucide-react";
import { useState } from "react";
import { SkeletonCard } from "./skeleton";

const manrope = Manrope({ subsets: ["latin"] });

export const LoginCard = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Card className="h-screen sm:h-auto rounded-none sm:rounded-2xl shadow-xl border border-white/40 bg-white/85 flex flex-col justify-center">
      {/* Skeleton de carga */}
      {isSubmitting && <SkeletonCard />}
      <div className={isSubmitting ? "hidden" : ""}>
        <CardHeader className="flex flex-col items-center justify-center text-center pt-2">
          <div className="w-16 h-16 rounded-xl bg-linear-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-md">
            <UtensilsCrossed className="w-8 h-8 text-white" />
          </div>
          <CardTitle
            className={`${manrope.className} text-2xl sm:text-3xl font-extrabold text-slate-900 pt-2`}
          >
            Bienvenido
          </CardTitle>
          <CardDescription className="text-slate-600 text-sm sm:text-base mt-1">
            Iniciá sesión para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginField onSubmittingChange={setIsSubmitting} />
        </CardContent>

        <CardFooter className="pt-3 flex flex-col items-center gap-3 ">
          <div className="flex items-center w-full">
            <span className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-500 px-3">Seguinos en</span>
            <span className="flex-1 h-px bg-slate-200" />
          </div>
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/flexitaim/?hl=es-la"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center hover:scale-110 transition-transform"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.tiktok.com/@flexitaim"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:scale-110 transition-transform"
            >
              <TiktokIcon />
            </a>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};
