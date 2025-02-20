import express from 'express';
import authRouter from './auth.js';
import userRouter from './user.js';
import classSubjectRouter from './class_subject.js';


const initialize = (app) => {
    app.use('/', authRouter)
    app.use('/',userRouter)
    app.use('/',classSubjectRouter)
}

export default initialize;