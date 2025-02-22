import express from 'express';
import authRouter from './auth.js';
import userRouter from './user.js';
import classSubjectRouter from './class_subject.js';
import otpRouter from './sendOtp.js';
import groupRouter from './group.js';
import marksRouter from './marksAdd.js';

const initialize = (app) => {
    app.use('/', authRouter)
    app.use('/',userRouter)
    app.use('/',classSubjectRouter)
    app.use('/',otpRouter)
    app.use('/',groupRouter)
    app.use('/',marksRouter)
}

export default initialize;