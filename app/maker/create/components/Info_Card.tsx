//tarjeta de creacion de menu
import { Button } from "@/common/components/atoms/button";
import {
  Card,
} from "@/common/components/organism/card";
import { DialogTrigger } from "@/common/components/organism/dialog";
import {  Edit, ImageIcon } from "lucide-react";
import { InfoDialog } from "./Info_Dialog";


export const InfoCard = () => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl shadow-md w-full max-w-sm md:max-w-2xl">
      <div className="flex flex-col items-center text-center p-8 md:p-16 space-y-4 md:space-y-6">
        <ImageIcon className="w-12 h-12 md:w-20 md:h-20 text-slate-300" />

        <h3 className="text-base md:text-xl font-semibold text-slate-800">
          Sin información
        </h3>

        <p className="text-sm md:text-base text-slate-500 max-w-65 md:max-w-lg leading-relaxed">
          Todavía no creaste un menú. Podés empezar desde el botón Crear.
        </p>

        <InfoDialog>
          <DialogTrigger asChild>
            <Button className="w-32 h-12 md:w-36 md:h-14 bg-orange-500 text-white rounded-xl flex items-center justify-center shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <Edit className="w-5 h-5 mr-2" />
              <span className="text-sm md:text-base">Crear</span>
            </Button>
          </DialogTrigger>
        </InfoDialog>
      </div>
    </Card>
  );
};