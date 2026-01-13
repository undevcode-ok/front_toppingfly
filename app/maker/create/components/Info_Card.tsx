//tarjeta de creacion de menu
import { Button } from "@/common/components/atoms/button";
import { Card } from "@/common/components/organism/card";
import { DialogTrigger } from "@/common/components/organism/dialog";
import { Edit, ImageIcon } from "lucide-react";
import { InfoDialog } from "./Info_Dialog";
import { X } from "lucide-react";
import { InfoField } from "./Info_Field";

export const InfoCard = () => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl shadow-md w-full max-w-sm md:max-w-2xl">
      <div className="flex justify-center text-xl font-semibold text-black py-2">
        Crear Menú
      </div>
      <div className="px-4">
        <InfoField />
      </div>
    </Card>
  );
};
