import db from '../../config/db.js'

class class_subjectModel{

    static async insertData(data){
        const {class_id,subject_id} = data;

        const inserQuery = 'INSERT INTO class_subject (class_id,subject_id) VALUES (?,?)';

        return new Promise((resolve,reject) => {
            db.query(inserQuery,[class_id,subject_id],(err,result) => {
                if(err){
                    reject({message : 'server error',err})
                }else if(result.affectedRows === 0){
                    reject({message : 'data not inserted'})
                }else{
                    resolve(result)
                }
            })
        })
    }

    static async allJoinData(){
        const joinQuery = `SELECT 
                        u.id AS userId,
                        u.name AS user_name,
                        u.email,
                        c.class_name,
                        GROUP_CONCAT(DISTINCT s.subject_name) AS subjects
                        FROM user u
                        JOIN class c ON u.class_id = c.id
                        JOIN class_subject cs ON c.id = cs.class_id
                        JOIN subject s ON cs.subject_id = s.id
                        GROUP BY u.id, u.name, u.email, c.class_name;`

        return new Promise((resolve,reject) => {
            db.query(joinQuery,(err,result) => {
                if(err){
                    reject({message : 'server err',err})
                }else if(result.length === 0){
                    resolve({message : "no user found",result : []})
                }else{
                    resolve(result)
                }
            })
        })

    }


    static async teacherJoin(){
        const joinQuery = `SELECT 
                    t.id AS teacher_id,
                    t.name AS teacher_name,
                    t.email AS teacher_email,
                    c.class_name,
                    s.subject_name
                    FROM user t
                    JOIN teacher_subject ts ON t.id = ts.teacher_id
                    JOIN class c ON ts.class_id = c.id
                    JOIN subject s ON ts.subject_id = s.id
                    WHERE t.usertype = 'faculty'; `

        return new Promise((resolve,reject) => {
            db.query(joinQuery,(err,results) => {
                if(err){
                    reject({message : 'server err',err})
                }else if(results.length === 0){
                    resolve({message : "no user found",result : []})
                }else{
                    resolve(results)
                }
            }) 
        })   
    }


}

export default class_subjectModel