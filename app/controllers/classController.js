import classModel from "../models/classModel.js";

class userController{
    static async singleClass(req,res){
        const id = req.params.id;
        try{
            const result = await userModel.findSingleClass({id})
            res.status(200).json(result)
        }catch(error){
            console.log('error in a find single user : ', error)
            res.status(500).json({message : 'server error in single user : ',error})
        }
    }

    static async allClass(req,res){
        try{
            const result = await userModel.findClass();
            res.status(200).json(result)
        }catch(error){
            console.log('error in a find single user : ', error)
            res.status(500).json({message : 'server error in single user : ',error})
        }
    }

    static async updateClasss(req,res){
        const {name,username,usertype,email} = req.body

        try{
            const result = await userModel.updateClass({name,username,usertype,email})
            res.status(200).json(result)
        }catch(error){
            console.log('error in a update user : ', error)
            res.status(500).json({message : 'server error update user : ',error})
        }
    }

    static async deleteClasss(req,res){
        const {email} = req.body

        try{
            const result = await userModel.deleteClass({email})
            res.status(200).json(result)
        }catch(error){
            console.log('error in a delete user : ', error)
            res.status(500).json({message : 'server error delete user : ',error})
        }
    }
}

export default userController;