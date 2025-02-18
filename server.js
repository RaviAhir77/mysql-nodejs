import express from 'express';
import './config/db.js';
import initialize from './routes/index.js';


const app = express();
app.use(express.json())
const PORT = 3000;

initialize(app)


app.listen(PORT,() => {
    console.log(`server is a running on ${PORT}`)
})