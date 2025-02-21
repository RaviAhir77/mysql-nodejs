import userModel from "../models/userModel.js";


class userController{
    static async singleUser(req,res){
        const id = req.params.id;
        try{
            const result = await userModel.findSingleUser({id})
            res.status(200).json(result)
        }catch(error){
            console.log('error in a find single user : ', error)
            res.status(500).json({message : 'server error in single user : ',error})
        }
    }

    static async allUser(req,res){
        try{
            const result = await userModel.findUser();
            res.status(200).json(result)
        }catch(error){
            console.log('error in a find single user : ', error)
            res.status(500).json({message : 'server error in single user : ',error})
        }
    }

    static async pagination(req,res){
        try{
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;

            const result = await userModel.findUserPagination(page,limit)
            res.status(200).json(result)
        }catch(err){
            res.status(500).json({message : 'server error in pagination',err})
        }
    }

    static async updateUserr(req,res){
        const {name,username,usertype,email} = req.body

        try{
            const result = await userModel.updateUser({name,username,usertype,email})
            res.status(200).json(result)
        }catch(error){
            console.log('error in a update user : ', error)
            res.status(500).json({message : 'server error update user : ',error})
        }
    }

    static async deleteUserr(req,res){
        const {email} = req.body

        try{
            const result = await userModel.deleteUser({email})
            res.status(200).json(result)
        }catch(error){
            console.log('error in a delete user : ', error)
            res.status(500).json({message : 'server error delete user : ',error})
        }
    }
}

export default userController;