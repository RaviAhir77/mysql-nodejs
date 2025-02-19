import authModel from "../models/authModel.js";

class authController{
    static async createUser(req,res){
        const {name,email,username,password,usertype} = req.body;
        const image = req.file ? req.file.filename : null

        try{
            const result = await authModel.insertUser({name,email,username,password,usertype,image});
            res.status(201).json(result)
        }catch(err){
            console.log('error in a createUser : ', err)
            res.status(500).json({message : 'server error in createUser : ',err})
        }
    }
}

export default authController;