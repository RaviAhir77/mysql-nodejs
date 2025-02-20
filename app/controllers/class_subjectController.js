import class_subjectModel from "../models/class_subjectModel.js";

class class_subjectController{
    static async createClass_subject(req,res){
        const {class_id,subject_id} = req.body;
        try{
            const result = await class_subjectModel.insertData({class_id,subject_id})
            res.status(201).json({message : 'new data is created', result})
        }catch(err){
            res.status(500).json({message : 'server side error',err})
        }
    }

    static async findUserClass(req,res){
        try{
            const result = await class_subjectModel.allJoinData()
            res.status(200).json({message : 'join result',result})
        }catch(error){
            console.log(error)
            res.status(500).json({message : 'server error',error})
        }
    }

    static async findTeacherDetails(req,res){
        try{
            const result = await class_subjectModel.teacherJoin();
            res.status(200).json({message : 'join result',result})
        }catch(error){
            console.log(error)
            res.status(500).json({message : 'server error',error})
        }   
    }
}

export default class_subjectController