import db from '../../config/db.js';
import XLSX from 'xlsx';
import path from 'path'


class sheetModel{
    static async xlUploder(file){
        
        const workBook = XLSX.readFile(file.path)
        const sheetname = workBook.SheetNames[0];
        const sheet = workBook.Sheets[sheetname];

        const jsonData = XLSX.utils.sheet_to_json(sheet);

        const query = `INSERT INTO test (name,email,age) VALUES ?`

        const values = jsonData.map(row => [row.name,row.email,row.age])

        return new Promise((resolve,reject) => {
            db.query(query,[values],(err,result) => {
                if(err){
                    reject({message : 'something wrong in xlxs upload',err})
                }else if(result.affectedRows === 0){
                    reject({message : 'no data uploaded',result : []})
                }else{
                    resolve({message : 'data successfully uploaded ', result})
                }
            })
        })
    }


    static async exportToExcel() {
        const query = 'SELECT * from user';

        return new Promise((resolve, reject) => {
            db.query(query, (err, results) => {
                if (err) {
                    reject({ message: 'error in fetching data', error: err });
                } else if (results.length === 0) {
                    reject({ message: 'no found data', results: [] });
                } else {
                    const worksheet = XLSX.utils.json_to_sheet(results);
                    const workbook = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

                    const filePath = path.join(process.cwd(), 'exports', 'data_export.xlsx');
                    XLSX.writeFile(workbook, filePath);

                    resolve({ message: 'Data exported successfully', filePath });
                }
            });
        });
    }
}

export default sheetModel