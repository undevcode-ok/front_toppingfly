//pagina de login : renderiza el login
"use client"
import { LoginCard } from "./login_card";
import Navbar from "@/app/auth/components/Navbar";


const login = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Navbar />
      <div className="flex-1 w-full flex items-center justify-center sm:p-4">
        <div className="w-full max-w-md">
          <LoginCard />
        </div>
      </div>
    </div>
  );
};

export default login;