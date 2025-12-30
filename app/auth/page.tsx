//pagina de login : renderiza el login
"use client"
import { LoginCard } from "./components/login_card";


const login = () => {
  return (
    <div className="w-full h-screen sm:h-auto sm:max-w-md">
      <LoginCard />
    </div>
  );
};

export default login;
