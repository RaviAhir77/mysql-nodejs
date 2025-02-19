import authModel from "../models/authModel.js";
import jwtGenerator from "../../utils/jwtGenerator.js";

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

    static async loginUser(req,res){
        const {email,password} = req.body;

        const user = await authModel.findUserByEmail(email)

        if(!user){
            return res.status(400).json({message : 'invalid email or password'})
        }

        const isValidPass = await authModel.comparePass(password,user.password);

        if(!isValidPass){
            return res.status(400).json({message : 'invalid email or password'})
        }

        const token = await jwtGenerator.generateJwt({
            id : user.id,
            username : user.username,
            usertype : user.usertype,
        })

        res.status(200).json({message : 'login succsess',token,user})
    }
}

export default authController;