import express from 'express';
import './config/db.js';
import passport from './config/passport.js'
import initialize from './routes/index.js';
import passportRoute from './routes/passportRoutes.js'
import limiter from './config/limiter.js';

const app = express();
const PORT = 3000;

app.use(express.json())
app.use('/uploads', express.static('uploads')); 
app.use(express.urlencoded({extended : true}));
app.use(limiter)
app.use(passport.initialize())
app.use('/auth',passportRoute)


initialize(app)


app.listen(PORT,() => {
    console.log(`server is a running on ${PORT}`)
})