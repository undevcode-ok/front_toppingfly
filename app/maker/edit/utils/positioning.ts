export const calculateNewPosition = (
  items: Array<{ position: number }>,
  oldIndex: number,
  newIndex: number
): number => {
  // CASO 1: Mover al principio
  if (newIndex === 0) {
    return Math.round(items[0].position - 1);
  }
  
  // CASO 2: Mover al final
  if (newIndex === items.length - 1) {
    return Math.round(items[items.length - 1].position + 1);
  }
  
  // CASO 3: Mover entre dos items
  const targetItem = items[newIndex];
  
  if (oldIndex < newIndex) {
    const prevPosition = targetItem.position;
    const nextPosition = items[newIndex + 1]?.position ?? targetItem.position + 1;
    return Math.round((prevPosition + nextPosition) / 2);
  } else {
    const prevPosition = items[newIndex - 1]?.position ?? targetItem.position - 1;
    const nextPosition = targetItem.position;
    return Math.round((prevPosition + nextPosition) / 2);
  }
};