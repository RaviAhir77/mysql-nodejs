import express from 'express';
import './config/db.js';
import initialize from './routes/index.js';


const app = express();
app.use(express.json())
app.use('/uploads', express.static('uploads')); 
app.use(express.urlencoded({extended : true}))
const PORT = 3000;

initialize(app)


app.listen(PORT,() => {
    console.log(`server is a running on ${PORT}`)
})