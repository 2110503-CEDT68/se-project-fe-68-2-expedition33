import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generatePDF = (payment: any, action: 'view' | 'download',date: Date) => {
  if (!payment) return;
  const doc = new jsPDF();

  // --- 1. Header & Logo ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("JOB FAIR 2022", 195, 17, { align: "right" });
  doc.addImage("/images/JobFairLogo.png", "PNG", 17, 7, 35, 35);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("67 Chulalongkorn University", 195, 25, { align: "right" });
  doc.text("Expedition 33", 195, 32, { align: "right" });

  // --- 2. Title Section ---
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.5);
  doc.rect(85, 45, 40, 12); 
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("RECEIPT", 105, 50, { align: "center" });
  doc.text("VOUCHER", 105, 55, { align: "center" });

  // --- 3. Decorative Lines (Centered to Title) ---
  doc.setLineWidth(1);
  doc.setDrawColor(249, 115, 22); 
  doc.line(14, 50.5, 80, 50.5); 
  doc.line(130, 50.5, 196, 50.5);
  doc.setLineWidth(0.5);
  doc.line(14, 51.5, 80, 51.5);
  doc.line(130, 51.5, 196, 51.5);

  // --- 4. Information Block ---
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("RECEIVED FROM", 14, 70);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(payment.company?.name || "Unknown Company", 14, 76);
  doc.text(`Address: ${payment.company?.address || "-"}`, 14, 82);
  doc.text(`Tel: ${payment.company?.tel || "-"}`, 14, 88);

  const paymentId = payment.id || payment._id || "N/A";
  
  // Update Date Format: Day Month Year Time
  const transactionDate = new Date(payment.updatedAt).toLocaleString('en-GB', {
    day: '2-digit', 
    month: 'long', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  const receiptDate = new Date(date).toLocaleString('en-GB', {
    day: '2-digit', 
    month: 'long', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  doc.text(`Voucher Number: RV-${paymentId.slice(-6).toUpperCase()}`, 195, 76, { align: "right" });
  doc.text(`Receipt Date: ${receiptDate}`, 195, 82, { align: "right" });

  // --- 5. Table Details ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("PAYMENT DETAILS", 105, 105, { align: "center" });

  const pricePerDay = payment.totalPrice / (payment.dateList?.length || 1);
  const tableBody = payment.dateList?.map((dateStr: string) => {
    const date = new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    return [`Organizing Interview Booth - ${date}`, `${pricePerDay.toLocaleString(undefined, {minimumFractionDigits: 2})} THB`];
  }) || [];

  autoTable(doc, {
    startY: 108,
    head: [['Description', 'Amount']],
    body: tableBody,
    theme: 'plain',
    headStyles: { fontStyle: 'bold', fontSize: 12, textColor: [0, 0, 0], halign: 'left' },
    styles: { cellPadding: 4, fontSize: 11 },
    columnStyles: { 
      0: { cellWidth: 132, halign: 'left' }, 
      1: { cellWidth: 50, halign: 'right' } 
    },
    didParseCell: (data) => {
      if (data.column.index === 1) {
        data.cell.styles.halign = 'right';
      }
    }
  });

  const finalY = (doc as any).lastAutoTable.finalY;

  // Header and Body Separation Lines
  doc.setLineWidth(0.5);
  doc.setDrawColor(0, 0, 0); 
  doc.line(14, 110, 196, 110); 
  doc.line(14, 118, 196, 118); 

  // --- Total Amount Section ---
  const totalBoxHeight = 12;
  const lineTop = finalY + 2;
  const lineBottom = lineTop + totalBoxHeight;
  const textMiddle = lineTop + (totalBoxHeight / 2) + 1.5; 

  doc.line(14, lineTop, 196, lineTop);
  doc.line(14, lineBottom, 196, lineBottom); 

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Total Amount", 18, textMiddle);
  doc.text(`${payment.totalPrice.toLocaleString(undefined, {minimumFractionDigits: 2})} THB`, 192, textMiddle, { align: 'right' });

  // --- 6. Footer & Signature ---
  const footerY = lineBottom + 15;
  doc.setFontSize(10);
  
  doc.setFont("helvetica", "bold");
  doc.text("Payment Method:", 14, footerY);
  doc.setFont("helvetica", "normal");
  doc.text("Online Gateway", 45, footerY);

  doc.setFont("helvetica", "bold");
  doc.text("Status:", 14, footerY + 7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(payment.status === 'captured' ? 0 : 200, payment.status === 'captured' ? 150 : 0, 0);
  doc.text(payment.status?.toUpperCase() || "UNKNOWN", 45, footerY + 7);
  
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.text("Trans. Date:", 14, footerY + 14);
  doc.setFont("helvetica", "normal");
  doc.text(transactionDate, 45, footerY + 14);

  // --- Signature (Fixed Position) ---
  const rightX = 130; 
  doc.setFont("helvetica", "bold");
  doc.text("Received By:", rightX, 240);
  doc.setFont("helvetica", "normal");
  doc.text("Expedition 33", rightX + 25, 240);
  
  doc.addImage("/images/sign.png", "PNG", rightX + 10, 242, 35, 12);
  
  doc.setDrawColor(150);
  doc.line(rightX, 255, 196, 255); 
  doc.setFontSize(8);
  doc.text("(Expedition 33 TEAM)", 163, 260, { align: "center" });

  // --- Footer Notes ---
  doc.setFontSize(11);
  doc.setFont("helvetica", "italic");
  doc.text("Thank you for your business!", 105, 275, { align: "center" });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(180, 180, 180); 
  doc.text("GG EZ Expedition 33", 105, 285, { align: "center" });

  if (action === 'download') {
    doc.save(`Receipt_${paymentId.slice(-6)}.pdf`);
  } else if (action === 'view') {
    const pdfBlobUrl = doc.output('bloburl');
    window.open(pdfBlobUrl, '_blank');
  }
};