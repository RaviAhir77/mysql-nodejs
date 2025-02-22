import marksModel from "../models/marksModel.js";

class marksController{
    static async addMarks(req,res){
        const {student_id,subject_id,teacher_id,marks_obtained,total_marks} = req.body;

        try{
            const result = await marksModel.insertMarks({student_id,subject_id,teacher_id,marks_obtained,total_marks})
            res.status(200).json(result)
        }catch(error){
            console.log(error)
            res.status(500).json({message : 'marks id not a added',error})
        }
    }
    
}

export default marksController;