const PDFDocument = require('pdfkit');
const fs = require('fs');
function buildPDF(data, onDataCallback, onEndCallback) {
    const doc = new PDFDocument();
    
    doc.fontSize(20).text('ElexKart');
  
    doc.fontSize(12).text(`Invoice Number: ${data.invoiceNumber}`);
    doc.fontSize(12).text(`Customer: ${data.customerName}`);
    doc.fontSize(12).text(`Date: ${data.date}`);
  
    doc.moveDown();
    doc.moveDown();
  
    // Table rows
    data.products.forEach((product) => {
      doc.fontSize(12).text(`Product:${product.name}`, { width: 200, align: 'left' });
      doc.fontSize(12).text(`Price:${product.price}`, { width: 200, align: 'left' });
      doc.fontSize(12).text(`Quantity:${product.quantity}`, { width: 200, align: 'left' });
      doc.moveDown();
    });
    doc.moveDown();
    doc.fontSize(12).text(`Total: ${data.amount}`);
    doc.end();
  
    doc.on('data', onDataCallback);
    doc.on('end', onEndCallback);
  }
  
  
module.exports = { buildPDF };