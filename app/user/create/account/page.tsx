//pagina de crear usuario : renderiza la pagina de creacion
import { CreateCard } from "./components/Create_Card";
import { Navbar } from "./components/Navbar";

const page = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Navbar />
      <div className="flex-1 w-full flex items-center justify-center sm:p-4">
        <div className="w-full max-w-md">
          <CreateCard />
        </div>
      </div>
    </div>
  );
};

export default page;
