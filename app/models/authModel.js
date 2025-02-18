import db from '../../config/db.js'
import bcrypt from 'bcrypt'

async function insertUser(data){
    const {name,email,username, password, usertype} = data

    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password,saltRound)

    const insertQuery = 'INSERT INTO user (name,email,username,password,usertype) VALUES (?, ?, ?, ?, ?)';
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
        db.query(insertQuery,[name,email,username,hashedPassword,usertype],(err,result) => {
            if(err){
                reject(err)
            }else{
                resolve({message : 'user created succsefully :',data : result})
            }
        })          
    })
}

async function findUser(){
    const allUserQuery = 'SELECT * FROM user'
    return new Promise((resolve,reject) => {
        db.query(allUserQuery,(err,results) => {
            if(err){
                reject({message : 'error in a fetcing data',error : err})
            }else if(results.length === 0){
                resolve({message : 'user not found', data : []})
            }else{
                resolve({message : 'all user list', data : results})
            }
        })
    })
}

async function findSingleUser(data){
    const {id} = data;
    const findSingleUser = 'SELECT * FROM user WHERE id = ?'

    return new Promise((resolve,reject) => {
        db.query(findSingleUser,[id],(err,results) => {
            if(err){
                return reject({message : 'error in a findUser', error : err})
            }

            if(results.length == 0){
                return resolve({message : 'not user found',data : results})
            }

            if(results.length > 0){
                const user = results[0];
                return resolve({message : 'user found', data : user})
            }
        })
    })
}

async function updateUser(data){
   const {name,username,usertype,email} = data;
   
   const updateQuery = 'UPDATE user SET name = ?,username = ?,usertype = ? WHERE email = ?'

   return new Promise((resolve,reject) => {
        db.query(updateQuery,[name,username,usertype,email],(err,result) => {
            if(err){
                reject({message : 'err in update route',err})
            }else if(result.affectedRows === 0){
                reject({message : 'user not found'})
            }else{
                resolve({message : 'user updated success', data : result})
            }
        })
   })
}

async function deleteUser(data){
    const {email} = data
    const deleteQuery = 'DELETE FROM user WHERE email = ?'

    return new Promise((resolve,reject) => {
        db.query(deleteQuery,[email],(err,result) => {
            if(err){
                reject({message : 'some error accure in delete route',err})
            }else if(result.affectedRows === 0){
                reject({message : 'no user found for a delete'})
            }else{
                resolve({message : 'user deleted successfully',result})
            }
        })
    })
}


class authModel{
    static async createUsers(data){
        return insertUser(data)
    }

    static async findSingleUsers(data){
        return findSingleUser(data)
    }
    
    static async findUsers(){
        return findUser()
    }

    static async updateUsers(data){
        return updateUser(data)
    }

    static async deleteUsers(data){
        return deleteUser(data)
    }
}
export default authModel