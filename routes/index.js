import express from 'express';
import authRouter from './auth.js';
import userRouter from './user.js';
import classSubjectRouter from './class_subject.js';
import otpRouter from './sendOtp.js';
import groupRouter from './group.js';
import marksRouter from './marksAdd.js';
import utilRouter from './utilRouter.js';
import sheetRouter from './sheetRouter.js';

const initialize = (app) => {
    app.use('/', authRouter)
    app.use('/',userRouter)
    app.use('/',classSubjectRouter)
    app.use('/',otpRouter)
    app.use('/',groupRouter)
    app.use('/',marksRouter);
    app.use('/',utilRouter);
    app.use('/',sheetRouter)
}

export default initialize;