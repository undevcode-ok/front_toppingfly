import jsPDF from 'jspdf';

interface GenerateQrPdfOptions {
  qrImageBase64: string;
  menuName: string;
  menuId: number;
}

export const generateQrPdf = async ({
  qrImageBase64,
  menuName,
  menuId,
}: GenerateQrPdfOptions): Promise<void> => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // ====== FONDO DECORATIVO ======
  pdf.setFillColor(255, 250, 245); // Fondo crema muy suave
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  // Círculos decorativos sutiles (sin opacidad, solo colores claros)
  pdf.setFillColor(255, 235, 215);
  pdf.circle(-20, -20, 60, 'F');
  pdf.circle(pageWidth + 20, pageHeight + 20, 60, 'F');
  
  pdf.setFillColor(255, 245, 230);
  pdf.circle(pageWidth + 10, 30, 40, 'F');
  pdf.circle(-10, pageHeight - 30, 40, 'F');

  // ====== BARRA SUPERIOR DECORATIVA ======
  pdf.setFillColor(255, 145, 77); // Naranja
  pdf.rect(0, 0, pageWidth, 25, 'F');
  
  // Triángulos decorativos en la barra
  pdf.setFillColor(255, 183, 77);
  pdf.triangle(15, 8, 25, 8, 20, 18, 'F');
  pdf.triangle(pageWidth - 25, 8, pageWidth - 15, 8, pageWidth - 20, 18, 'F');

  

  // ====== TÍTULO PRINCIPAL ======
  pdf.setTextColor(51, 51, 51);
  pdf.setFontSize(28);
  pdf.setFont('helvetica', 'bold');
  pdf.text(menuName, pageWidth / 2, 45, { align: 'center' });

  // Línea decorativa bajo el título
  pdf.setDrawColor(255, 145, 77);
  pdf.setLineWidth(0.8);
  const lineWidth = 60;
  pdf.line(
    (pageWidth - lineWidth) / 2,
    50,
    (pageWidth + lineWidth) / 2,
    50
  );

  // ====== SUBTÍTULO ======
  pdf.setFontSize(13);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(102, 102, 102);
  pdf.text('Escanea este código QR', pageWidth / 2, 60, { align: 'center' });
  pdf.text('para ver nuestro menú digital', pageWidth / 2, 67, { align: 'center' });

  // ====== CONTENEDOR DEL QR CON BORDE DECORATIVO ======
  const qrSize = 110;
  const qrX = (pageWidth - qrSize) / 2;
  const qrY = 80;

  // Sombra simple (sin opacidad)
  pdf.setFillColor(220, 220, 220);
  pdf.roundedRect(qrX + 2, qrY + 2, qrSize, qrSize, 8, 8, 'F');

  // Borde doble decorativo
  pdf.setDrawColor(255, 145, 77);
  pdf.setLineWidth(3);
  pdf.roundedRect(qrX - 6, qrY - 6, qrSize + 12, qrSize + 12, 8, 8, 'S');
  
  pdf.setDrawColor(255, 183, 77);
  pdf.setLineWidth(1);
  pdf.roundedRect(qrX - 8, qrY - 8, qrSize + 16, qrSize + 16, 10, 10, 'S');

  // Fondo blanco del QR
  pdf.setFillColor(255, 255, 255);
  pdf.roundedRect(qrX, qrY, qrSize, qrSize, 5, 5, 'F');

  // Agregar imagen del QR - ASEGURARSE DE QUE SE DIBUJE
  pdf.addImage(qrImageBase64, 'PNG', qrX + 5, qrY + 5, qrSize - 10, qrSize - 10);

  // ====== INSTRUCCIONES ======
  const instructionsY = qrY + qrSize + 20;

  // Caja de instrucciones
  pdf.setFillColor(255, 245, 230);
  pdf.setDrawColor(255, 183, 77);
  pdf.setLineWidth(0.5);
  pdf.roundedRect(20, instructionsY, pageWidth - 40, 45, 5, 5, 'FD');

  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(255, 145, 77);
  pdf.text('¿Cómo escanear?', pageWidth / 2, instructionsY + 8, { align: 'center' });

  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(80, 80, 80);
  
  const instructions = [
    '1. Abre la cámara de tu smartphone',
    '2. Apunta al código QR',
    '3. Toca la notificación que aparece',
    '4. ¡Disfruta de nuestro menú digital!'
  ];

  let yPos = instructionsY + 16;
  instructions.forEach((instruction) => {
    pdf.text(instruction, 30, yPos);
    yPos += 7;
  });

  // ====== FOOTER DECORATIVO ======
  const footerY = pageHeight - 25;
  
  // Línea decorativa
  pdf.setDrawColor(255, 183, 77);
  pdf.setLineWidth(0.5);
  pdf.line(30, footerY, pageWidth - 30, footerY);

  // Texto del footer
  pdf.setFontSize(9);
  pdf.setTextColor(150, 150, 150);
  pdf.setFont('helvetica', 'italic');
  pdf.text('¡Gracias por elegirnos!', pageWidth / 2, footerY + 6, { align: 'center' });
  
  pdf.setFontSize(7);
  pdf.setFont('helvetica', 'normal');
  

  // Pequeños puntos decorativos en el footer
  pdf.setFillColor(255, 183, 77);
  const dotY = footerY + 6;
  pdf.circle(pageWidth / 2 - 45, dotY, 1, 'F');
  pdf.circle(pageWidth / 2 + 45, dotY, 1, 'F');

  // ====== GENERAR Y DESCARGAR ======
  const fileName = `menu-qr-${menuId}-${Date.now()}.pdf`;
  pdf.save(fileName);
};