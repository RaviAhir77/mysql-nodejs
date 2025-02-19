import { query } from 'express';
import db from '../../config/db.js'
import bcrypt from 'bcrypt'

class authModel{

    static async insertUser(data){
        const {name,email,username, password, usertype,image} = data
    
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password,saltRound)
    
        const insertQuery = 'INSERT INTO user (name,email,username,password,usertype,image) VALUES (?, ?, ?, ?, ?, ?)';
        const validationQuery = 'SELECT * FROM user WHERE email = ? OR username = ?';
    
        return new Promise((resolve, reject) => {
            //chech username or email exist
            db.query(validationQuery,[email,username],(err,result) => {
                if(err){
                    return reject(err)
                }
    
                if(result.length > 0){
                    const user = result[0];
    
                    if(user.email === email){
                        return reject({message : 'that user allready exist !'})
                    }
    
                    if(user.username === username){
                        return reject({message : 'please select another username'})
                    }
                }
            })
    
            //insert data in a usertable
            db.query(insertQuery,[name,email,username,hashedPassword,usertype,image],(err,result) => {
                if(err){
                    reject(err)
                }else{
                    resolve({message : 'user created succsefully :',data : result})
                }
            })          
        })
    }


    //_____________ LOGIN ROUTE _________________

    static async findUserByEmail(email){
        const queryLogin = 'SELECT * FROM user WHERE email = ?'

        return new Promise((resolve,reject) => {
            db.query(queryLogin,[email],(err,result) => {
                if(err){
                    reject({message : 'database error',err})
                }else if(result.length === 0){
                    resolve(null)
                }else{
                    resolve(result[0])
                }
            })
        })
    }

    // __________ BCRYPT COMPARE FUNCTION ____________

    static async comparePass(enteredPass,storedPass){
        return await bcrypt.compare(enteredPass,storedPass)
    }
    
}
export default authModel