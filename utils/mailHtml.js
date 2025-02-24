const generateHtml = (userData) => {
    return `
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .container { max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; }
            h2,h3 { text-align: center; color: #333; }
            i{display : block;text-align : center;}
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f4f4f4; }
            .download-btn { display: block; text-align: center; margin-top: 20px; }
            .button { background: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>PDF SAMPLE</h2>
            <i>Created with a pdfkit && html</i>
            <hr/>
            <p>Name: Ravi</p>
            <p>Profession: FullStack Developer</p>
            <p>City: Rajkot</p>

            <h3>User Data from Database</h3>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
                ${userData.map(user => `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                </tr>`).join('')}
            </table>

            <div class="download-btn">
                <a href="http://localhost:3000/pdf-sender" class="button">Download Invoice</a>
            </div>
        </div>
    </body>
    </html>
    `;
};

export default generateHtml;
