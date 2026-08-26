// link subrayado reutilizable: "Actualizá tu plan" -> abre WhatsApp con un mensaje predefinido.
// Se usa en los toasts/mensajes que aparecen cuando un usuario del plan Free
// llega a alguno de sus límites (menús, ítems, imágenes).
"use client";

import { useWhatsApp } from "@/app/landing/hooks/use_WhatsApp";
import { WHATSAPP_CONFIG } from "@/app/landing/utils/landing_constants";

const UPGRADE_PLAN_MESSAGE =
  "¡Hola! Quiero actualizar mi plan Free de ToppingFly a uno superior.";

interface UpgradePlanLinkProps {
  label?: string;
  className?: string;
}

export const UpgradePlanLink = ({
  label = "Actualizá tu plan",
  className = "underline font-semibold text-orange-600 hover:text-orange-700",
}: UpgradePlanLinkProps) => {
  const { openWhatsApp } = useWhatsApp({
    phoneNumber: WHATSAPP_CONFIG.phoneNumber,
  });

  return (
    <button
      type="button"
      onClick={() => openWhatsApp(UPGRADE_PLAN_MESSAGE)}
      className={className}
    >
      {label}
    </button>
  );
};