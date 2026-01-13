import { useSensors, useSensor, TouchSensor, MouseSensor, KeyboardSensor } from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

export const useDragAndDrop = () => {
  return useSensors(
    // Sensor para mouse en desktop
    // Si mueves 8px antes del delay, se activa el drag
    // Si no mueves y sueltas rápido, es un click normal
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8, // Si mueves 8px, activa el drag inmediatamente
      },
    }),
    // Sensor para dispositivos táctiles
    // Requiere mantener presionado 250ms SIN mover más de 5px
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100, // 250ms de hold para activar drag
        tolerance: 10, // Puedes mover hasta 5px durante el delay
      },
    }),
    // Sensor para teclado (accesibilidad)
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
};