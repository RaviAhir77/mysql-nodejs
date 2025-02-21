import db from '../../config/db.js'

class ageGroupModel{
    static async ageGrouper(){
        const ageQuery = `SELECT 
                        CASE 
                            WHEN age < 10 THEN 'Below 10'
                            WHEN age BETWEEN 10 AND 14 THEN 'Between 10 - 14'
                            WHEN age > 14 THEN 'Greater than 14'
                        END AS age_group,
                        COUNT(*) AS student_count
                        FROM user
                        WHERE usertype = 'student'
                        GROUP BY age_group;  `

        return new Promise((resolve,reject) => {
            db.query(ageQuery,(err,result) => {
                if(err){
                    reject(err)
                }else if(result.length === 0){
                    resolve({message : 'no user found', result : []})
                }else{
                    resolve(result)
                }
            })
        })
    }
}


export default ageGroupModel;