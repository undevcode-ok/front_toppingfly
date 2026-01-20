
export const INFO_CARDS_DATA = [
  {
    id: "restaurante",
    titleImageSrc: "/logos/Buen_Sabor.png",
    titleImageAlt: "El buen sabor",
    qrImageSrc: "/qr/Buen_Sabor.png", // QR específico del restaurante
    position: "left-[-8%] top-[1%]",
    delay: 0.4,
    animationDelay: 0.5,
  },
  {
    id: "hamburgueseria",
    titleImageSrc: "/logos/Hot_Burger.png",
    titleImageAlt: "Hot Burger",
    qrImageSrc: "/qr/Hot_Burger.png", // QR específico de la hamburguesería
    position: "right-[-8%] top-[1%]",
    delay: 0.4,
    animationDelay: 0.7,
  },
  {
    id: "pizzeria",
    titleImageSrc: "/logos/Napoli_Express.png",
    titleImageAlt: "Napoli Express",
    qrImageSrc: "/qr/Napoli_Express.png", // QR específico de la pizzería
    position: "left-[14%] top-[24%]",
    delay: 0.6,
    animationDelay: 0.9,
  },
  {
    id: "cafeteria",
    titleImageSrc: "/logos/Cafe_Aroma.png",
    titleImageAlt: "Cafe Aroma",
    qrImageSrc: "/qr/Cafe_Aroma.png", // QR específico de la cafetería
    position: "right-[14%] top-[24%]",
    delay: 0.6,
    animationDelay: 1.1,
  },
] as const;

export const WHATSAPP_CONFIG = {
  phoneNumber: "541170605577",
  defaultMessage: "¡Hola! Me interesa saber más sobre ToppingFly",
};

export const VIDEO_CONFIG = {
  videoUrl: "/video/toppingfly_intro.mov",
  posterImage: "/images/video-poster.jpg",
};