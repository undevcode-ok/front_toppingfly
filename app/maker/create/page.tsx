// pagina de renderizado de la pagina crear menu
import { InfoCard } from "./components/Info_Card";
import { Navbar } from "./components/navbar";
import { FreePlanCreateGuard } from "./components/Free_Plan_Create_Guard";

const page = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <FreePlanCreateGuard />
      <Navbar />
      <div className="flex flex-col items-center py-8 px-10 grow sm:px-4  sm:justify-center">
        <InfoCard />
      </div>
    </div>
  );
};

export default page;