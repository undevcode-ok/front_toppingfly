// página de registro free: renderiza el formulario de alta de cuenta free
import { Navbar } from "@/app/user/create/account/components/Navbar";
import { RegisterCard } from "./components/Register_Card";

const registerFree = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
          <Navbar />
          <div className="flex-1 w-full flex items-center justify-center sm:p-4">
            <div className="w-full max-w-md">
      <RegisterCard />
      </div>
      </div>
    </div>
  );
};

export default registerFree;