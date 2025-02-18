import authModel from "../models/authModel.js";

class authController{
    static async createUser(req,res){
        const {name,email,username,password,usertype} = req.body;

        try{
            const result = await authModel.createUsers({name,email,username,password,usertype});
            res.status(201).json({message : 'new user created',user : result})
        }catch(err){
            console.log('error in a createUser : ', err)
            res.status(500).json({message : 'server error in createUser : ',err})
        }
    }

    static async singleUser(req,res){
        const id = req.params.id;
        try{
            const result = await authModel.findSingleUsers({id})
            res.status(200).json({message : 'single user list', data : result})
        }catch(error){
            console.log('error in a find single user : ', error)
            res.status(500).json({message : 'server error in single user : ',error})
        }
    }

    static async allUser(req,res){
        try{
            const result = await authModel.findUsers();
            res.status(200).json({message : 'all user', data : result})
        }catch(error){
            console.log('error in a find single user : ', error)
            res.status(500).json({message : 'server error in single user : ',error})
        }
    }

    static async updateUserr(req,res){
        const {name,username,usertype,email} = req.body

        try{
            const result = await authModel.updateUsers({name,username,usertype,email})
            res.status(200).json({message : 'updated user',data : result})
        }catch(error){
            console.log('error in a update user : ', error)
            res.status(500).json({message : 'server error update user : ',error})
        }
    }

    static async deleteUserr(req,res){
        const {email} = req.body

        try{
            const result = await authModel.deleteUsers({email})
            res.status(200).json({message : 'deleted user',data : result})
        }catch(error){
            console.log('error in a delete user : ', error)
            res.status(500).json({message : 'server error delete user : ',error})
        }
    }

}

export default authController;