import db from '../../config/db.js';

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
}

export default marksModel;