// página de registro free: renderiza el formulario de alta de cuenta free
import { RegisterCard } from "./components/Register_Card";

const registerFree = () => {
  return (
    <div className="w-full h-screen sm:h-auto sm:max-w-md sm:mx-auto flex items-center justify-center">
      <RegisterCard />
    </div>
  );
};

export default registerFree;