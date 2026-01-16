import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail, Music2 } from "lucide-react";
import Image from "next/image";


export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#FFE6D3] to-orange-100 border-t border-orange-200 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Columna 1 - Logo y descripción */}
          <div className="md:col-span-1 flex content-center">
            <Image 
              src="/toppingfly.webp" 
              alt="toppingfly" 
              width={200} 
              height={200}
              className=""
            />
          </div>

          {/* Columna 2 - Enlaces rápidos */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Producto</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-700 hover:text-orange-600 transition">
                  Características
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-orange-600 transition">
                  Beneficios
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-orange-600 transition">
                  Ejemplos
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3 - Soporte */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Soporte</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-700 hover:text-orange-600 transition">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-orange-600 transition">
                  Ayuda
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-700 hover:text-orange-600 transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4 - Redes sociales */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <Link 
                href="https://www.instagram.com/toppingfly/" 
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link 
                href="#" 
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
            Desarrollado con ❤ por el equipo de <Link href="https://undevcode.com/" className=" bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent font-bold"> UNDEVCODE
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};