import express from 'express';
import authRouter from './auth.js';
import userRouter from './user.js';
import classSubjectRouter from './class_subject.js';
import otpRouter from './sendOtp.js';


const initialize = (app) => {
    app.use('/', authRouter)
    app.use('/',userRouter)
    app.use('/',classSubjectRouter)
    app.use('/',otpRouter)
}

export default initialize;