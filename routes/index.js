import express from 'express';
import authRouter from './auth.js';
import userRouter from './user.js';


const initialize = (app) => {
    app.use('/', authRouter)
    app.use('/',userRouter)
}

export default initialize;