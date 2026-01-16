export const INFO_CARDS_DATA = [
  {
    id: "restaurante",
    title: "El buen sabor",
    position: "left-[-8%] top-[1%]",
    delay: 0.4,
    animationDelay: 0.5,
    titleStyle:
      "text-3xl text-green-700 font-bold tracking-tighter hover:scale-105 transition-transform duration-300",
    descriptionStyle:
      "text-emerald-900/60 text-base font-semibold italic border-t border-green-100 pt-1 mt-2",
    fontFamily: "'Quicksand', sans-serif",
  },
  {
    id: "hamburgueseria",
    title: "HOT BURGER",
    description: "Menú rápido y accesible",
    position: "right-[-8%] top-[1%]",
    delay: 0.4,
    animationDelay: 0.7,
    titleStyle: "text-3xl text-[#e63946] font-black uppercase tracking-tighter",
descriptionStyle: "text-white bg-black text-[10px] font-bold px-2 py-1 inline-block uppercase mt-2 tracking-widest",
fontFamily: "'Archivo Black', sans-serif",
  },
  {
    id: "pizzeria",
    title: "Napoli Express",
    description: "Menú de pizzas artesanales",
    position: "left-[12%] top-[35%]",
    delay: 0.6,
    animationDelay: 0.9,
    titleStyle:
      "text-3xl text-yellow-500 font-extrabold italic tracking-tight skew-x-[-4deg] drop-shadow-[3px_3px_0px_rgba(0,0,0,0.1)]",
    descriptionStyle:
      "text-gray-500 text-sm font-medium italic border-l-2 border-red-600 pl-2 mt-2",
    fontFamily: "'Kanit', sans-serif",
  },
  {
    id: "cafeteria",
    title: "cafe aroma",
    description: "Sabores y promociones",
    position: "right-[12%] top-[35%]",
    delay: 0.6,
    animationDelay: 1.1,
    titleStyle:
      "text-3xl text-[#5d2a18] font-bold italic tracking-tight leading-none",
    descriptionStyle:
      "text-gray-400 text-sm font-serif border-t border-gray-200 pt-2 mt-2",
    fontFamily: "'Playfair Display', serif",
  },
] as const;

export const WHATSAPP_CONFIG = {
  phoneNumber: "541170605577", // Cambia por tu número
  defaultMessage: "¡Hola! Me interesa saber más sobre ToppingFly",
};

export const VIDEO_CONFIG = {
  videoUrl: "/video/intro_toppingfly.mov",
  posterImage: "/images/video-poster.jpg",
};

/*(+54)1170605577 y (+54)1140437418 */
