import Link from "next/link";
import { Instagram, Music2 } from "lucide-react";
import Image from "next/image";
import { useSmoothScroll } from "../hooks/use_smooth_control";
import { useWhatsApp } from "../hooks/use_WhatsApp";

export const Footer = () => {

  const { handleSmoothScroll } = useSmoothScroll();
  const { openWhatsApp } = useWhatsApp({
    phoneNumber: "541140437418", // Número diferente para contacto/soporte
    defaultMessage: "Hola, necesito ayuda con ToppingFly",
  });
  return (
   <footer className="bg-linear-to-b from-[#FFE6D3] to-orange-100 border-t border-orange-200 mt-20">
  <div className="max-w-6xl mx-auto px-4 py-12">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 ">
      {/* Columna 1 - Logo y descripción */}
      <div className="flex justify-center md:justify-start items-start">
        <div className="flex h-10 items-center gap-1  p-1"> {/* Ajuste de la altura de la imagen */}
          <Image 
            src="/toppingfly.webp" 
            alt="toppingfly" 
            width={200} 
            height={100}  
            className="object-contain"
          />
        </div>
        
      </div>

          {/* Columna 2 - Enlaces rápidos */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-lg mb-4">Producto</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#features" 
                  onClick={(e) => handleSmoothScroll(e, 'features')}
                  className="text-gray-700 hover:text-orange-600 transition cursor-pointer"
                >
                  Características
                </a>
              </li>
             
              <li>
               <a 
                  href="#qr" 
                  onClick={(e) => handleSmoothScroll(e, 'qr')}
                  className="text-gray-700 hover:text-orange-600 transition cursor-pointer"
                >
                  Escanea y Descubre
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3 - Soporte */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-lg mb-4">Soporte</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => openWhatsApp()}
                  className="text-gray-700 hover:text-orange-600 transition cursor-pointer"
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 4 - Redes sociales */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold text-lg mb-4">Síguenos</h4>
            <div className="flex space-x-4 justify-center md:justify-start">
              <Link
                href="https://www.instagram.com/toppingfly/"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.tiktok.com/@toppyngfly"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition"
              >
                <Music2 className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Línea divisoria y copyright */}
        <div className="border-t border-orange-200 mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            Desarrollado con ❤ por el equipo de{" "}
            <Link
              href="https://undevcode.com/"
              className=" bg-linear-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent font-bold"
            >
              {" "}
              UNDEVCODE
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
