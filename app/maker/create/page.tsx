// pagina de renderizado de la pagina crear menu
import { InfoCard } from "./components/Info_Card";
import { Navbar } from "./components/navbar";

const page = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center py-8 px-10 grow sm:px-4  sm:justify-center">
        <InfoCard />
      </div>
    </div>
  );
};

export default page;