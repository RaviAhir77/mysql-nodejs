import PDFDocument from 'pdfkit';
// import PdfParse from 'pdf-parse';
import db from '../../config/db.js'

export const generatePdf = async(res) => {
    const doc = new PDFDocument({
        size : 'A4',
        margins : {top : 50,left :20,bottom : 50,right:20},
        font : 'Helvetica-Oblique',
    })
    
    doc.pipe(res)
    doc.fontSize(20).text('PDF SAMPLE',{align:'center',lineGap : 10})
    doc.fontSize(16).text('Created with a pdfkit',{align:'center'})
    doc.moveTo(20,doc.y + 5).lineTo(565,doc.y + 5).stroke();

    doc.moveDown(1)
    doc.fontSize(18).font('Courier-Bold').text('Name : ',{continued : true,characterSpacing : 1})
    doc.fontSize(18).font('Courier').text('Ravi',{lineGap : 10})

    doc.fontSize(18).font('Courier-Bold').text('Profesion : ',{continued : true,characterSpacing : 1})
    doc.fontSize(18).font('Courier').text('FullStack Developer',{lineGap : 10})

    doc.fontSize(18).font('Courier-Bold').text('City :',{continued : true,characterSpacing : 1})
    doc.fontSize(18).font('Courier').text('Rajkot',{lineGap : 10})

    doc.moveTo(20,doc.y + 5).lineTo(565,doc.y + 5).stroke();
    doc.moveDown(1);
    doc.fontSize(20).text('USER DATA FROM DATABASE',{align:'center',lineGap :20});

    db.query('SELECT id,name,email FROM user',(err,result) => {
        if(err){
            console.log(err)
            return
        }

        doc.moveDown().fontSize(14).text('ID', 50).text('Name', 150).text('Email', 300);

        doc.moveTo(50, doc.y + 5).lineTo(550, doc.y + 5).stroke();

        result.forEach((user) => {
            doc.moveDown().fontSize(12)
                .text(user.id.toString(), 50)
                .text(user.name, 150)
                .text(user.email, 300);
            });
        doc.end()
    })
}





