import ageGroupModel from "../models/ageGroupModel.js";

class ageGroupController{
    static async grouper(req,res){
        try{
            const result = await ageGroupModel.ageGrouper();
            res.status(200).json({message : 'grouped result',result})
        }catch(error){
            console.log(error)
            res.status(500).json({message : 'error in a grouper route',error})
        }
    }
}

export default ageGroupController