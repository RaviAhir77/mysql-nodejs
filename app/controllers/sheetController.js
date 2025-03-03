import fs from 'fs';
import sheetModel from '../models/sheetModel.js';

class SheetController{
    static async UploadFromFile(req,res){
        const file = req.file

        if(!file){
            return res.status(400).json({ message: 'file not found please upload' });
        }

        try{
            const result = await sheetModel.xlUploder(file)
            res.status(200).json({ message: 'data uploaded successfully', data : result });
        }catch(error){
            console.log(error)
            res.status(500).json({ message: 'something wrong in a dataUpload' });
        }
    }

    static async exportData(req, res) {
        try {
            const result = await sheetModel.exportToExcel();
            res.status(200).json({ message: result.message, filePath: result.filePath });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error exporting data to Excel', error: error.message });
        }
    }
}

export default SheetController;