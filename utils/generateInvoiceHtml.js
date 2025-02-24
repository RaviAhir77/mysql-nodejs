const generateInvoiceHtml = () => {
    return `
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .invoice-container { max-width: 800px; margin: auto; border: 1px solid #ddd; padding: 20px; }
                .header { display: flex; justify-content: space-between; align-items: center; }
                .header img { width: 80px; }
                .company-info, .client-info { font-size: 14px; }
                .invoice-title { font-size: 28px; margin-top: 20px; }
                .invoice-details { display: flex; justify-content: space-between; margin: 20px 0; }
                .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                .table th, .table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                .table th { background: #f4f4f4; }
                .total-section { text-align: right; margin-top: 20px; font-size: 18px; }
                .total-section strong { font-size: 24px; }
                .download-btn { display: block; text-align: center; margin-top: 20px; }
                .button { background:rgba(88, 211, 117, 0.47); color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
            </style>
        </head>
        <body>
            <div class="invoice-container">
                <div class="header">
                    <div class="company-info">
                        <h2>Company Name</h2>
                        <p>567 Street Name<br>City, State ZIP Code<br>Country</p>
                        <p>888-888-8888 | <a href="mailto:contact@email.com">contact@email.com</a><br>companywebsite.com</p>
                    </div>
                    <div>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Document_text_icon.svg/1200px-Document_text_icon.svg.png" width="80"/>
                    </div>
                </div>
                <hr>
                <div class="client-info">
                    <h3>Billed To:</h3>
                    <p>Your Client<br>Street Address<br>City, State ZIP Code<br>Country</p>
                </div>
                <h1 class="invoice-title">Invoice</h1>
                <div class="invoice-details">
                    <p><strong>Invoice Number:</strong> 00001</p>
                    <p><strong>Date of Issue:</strong> mm/dd/yyyy</p>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Unit Cost</th>
                            <th>QTY/HR RATE</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Item name</td><td>$0</td><td>1</td><td>$0</td>
                        </tr>
                        <tr>
                            <td>Item name</td><td>$0</td><td>1</td><td>$0</td>
                        </tr>
                        <tr>
                            <td>Item name</td><td>$0</td><td>1</td><td>$0</td>
                        </tr>
                        <tr>
                            <td>Item name</td><td>$0</td><td>1</td><td>$0</td>
                        </tr>
                        <tr>
                            <td>Item name</td><td>$0</td><td>1</td><td>$0</td>
                        </tr>
                    </tbody>
                </table>
                <div class="total-section">
                    <p>Subtotal: $0</p>
                    <p>Discount: $0</p>
                    <p>(Tax Rate) 0%: $0</p>
                    <p><strong>Invoice Total: $5000</strong></p>
                </div>
                <div class="download-btn">
                    <a href="http://localhost:3000/pdf-generator" class="button">Download Invoice</a>
                </div>
            </div>

            
        </body>
        </html>
    `;
};

export default generateInvoiceHtml;
