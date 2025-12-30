"use client";

import { Navbar } from "./components/navbar";
import { InfoCard } from "./components/info_card/Info_Card";
import { Suspense } from "react";
import { DeleteButton } from "./components/Delete_Button";
import { MenuCard } from "./components/menu_card/Menu_Card";
import { useSearchParams } from "next/navigation";
import { useFetchMenu } from "./hooks/use_fetch_menu";
import { Loader } from "./components/Loader";

// Componente interno que usa useSearchParams
const EditPageContent = () => {
  const searchParams = useSearchParams();
  const menuId = searchParams.get("id");

  const { menuData } = useFetchMenu(menuId);

  // Mostrar loading mientras se cargan los datos
  if (!menuData) {
    return (
      <div className="min-h-screen w-full flex flex-col">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <Navbar menuData={menuData} />
      <div className="flex flex-col justify-center items-center py-8 grow">
        <InfoCard menuData={menuData} />
        <MenuCard menuData={menuData} />
        <DeleteButton />
      </div>
    </div>
  );
};

// Componente principal con Suspense
const EditPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Suspense fallback={<Loader />}>
        <EditPageContent />
      </Suspense>
    </div>
  );
};

export default EditPage;
