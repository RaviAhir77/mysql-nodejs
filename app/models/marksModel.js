import db from '../../config/db.js';

const cache = {};
const CACHE_EXPIRY = 60 * 1000; 


setInterval(() => {
    const now = Date.now();
    for (const key in cache) {
        if (cache[key].expiry < now) {
            delete cache[key];
        }
    }
}, 30 * 1000); 

class marksModel{
    static async insertMarks(data){
        const {student_id,subject_id,teacher_id,marks_obtained,total_marks} = data;

        const inserQuery = `INSERT INTO student_marks 
                                (student_id,subject_id,teacher_id,marks_obtained,total_marks)
                            VALUES (?,?,?,?,?);`

        return new Promise((resolve,reject) =>{
            db.query(inserQuery,[student_id,subject_id,teacher_id,marks_obtained,total_marks],(err,result) => {
                if(err){
                    reject({message : 'server error',err})
                }else if(result.affectedRows === 0){
                    reject({message : 'sorry not user inserted'})
                }else{
                    resolve({message : 'user\'s marks successfully inserted',data : result})
                }
            })
        });
    }

    static async getMarks(data){
        const {id} = data

        if (cache[id] && cache[id].expiry > Date.now()) {
            return {data : cache[id].data, source : 'catch'}; // Return cached data
        }

        const findQuery = `
            SELECT 
                u.name AS student_name, 
                s.subject_name, 
                sm.marks_obtained, 
                sm.total_marks
            FROM student_marks sm
            JOIN user u ON sm.student_id = u.id
            JOIN subject s ON sm.subject_id = s.id
            WHERE u.id = ? AND u.usertype = 'student';
        `

        return new Promise((resolve,reject) => {
            db.query(findQuery,[id],(err,result) => {
                if(err){
                    reject({message : 'something wrong',err})
                }else if(result.length === 0){
                    resolve({message : 'no marks found',result : []})
                }else{
                    cache[id] = {
                        data: result,
                        expiry: Date.now() + CACHE_EXPIRY,
                    };
                    resolve({data : result, source : 'database'})
                }
            })
        })
    }
}

export default marksModel;