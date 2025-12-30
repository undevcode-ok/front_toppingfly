"use client";

import { Button } from "@/common/components/atoms/button";
import { useDeleteMenu } from "../hooks/use_delete_menu";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/organism/dialog";
import { Trash2, X, AlertTriangle } from "lucide-react";
import { DialogDelete } from "./Dialog_Delete";

export const DeleteButton = () => {
  const searchParams = useSearchParams();
  const menuId = searchParams.get("id");
  const router = useRouter();

  const { deleteMenu, isDeleting } = useDeleteMenu(router);

  const handleDeleteMenu = () => {
    deleteMenu(Number(menuId));
  };

  return (
    <motion.div
      className="w-full sm:max-w-xl px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button className="sm:max-w-xl text-xl w-full py-8 mt-8 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-red-500/25 max-w-sm mx-auto">
            Borrar
          </Button>
        </DialogTrigger>

        <DialogDelete
          handleDeleteMenu={handleDeleteMenu}
          isDeleting={isDeleting}
        />
      </Dialog>
    </motion.div>
  );
};
