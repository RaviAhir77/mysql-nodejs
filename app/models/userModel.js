import db from '../../config/db.js'

class userModel{
    static async findUser(){
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

    static async findUserPagination(page,limit){
        const offset = (page - 1) * limit; 
        const allUserQuery = 'SELECT id,name,email,username,usertype FROM user LIMIT ? OFFSET ?';
        const countQuery = 'SELECT COUNT(*) AS total FROM user';

        return new Promise((resolve,reject) => {
            db.query(countQuery,(err,countResult) => {
                if(err){
                    reject({message : 'there is not find',err})
                }

                const totalUser = countResult[0].total

                db.query(allUserQuery,[parseInt(limit),parseInt(offset)],(err,result) => {
                    if(err){
                        reject({message : 'error in a get data',err})
                    }else if(result.length === 0){
                        resolve({message : 'no user found', result : []})
                    }else{
                        resolve({
                            message : 'user list',
                            totalUser,
                            totalPage : Math.ceil(totalUser/limit),
                            currentPage : page,
                            data : result
                        })
                    }
                })
            })


        })

    }
    
    static async findSingleUser(data){
        const {id,userId} = data;
        const findSingleUser = 'SELECT * FROM user WHERE id = ?'

        if(id != userId){
            return 'please enter your id'
        }
    
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
    
    static async updateUser(data){
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
    
    static async deleteUser(data){
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
    
}

export default userModel