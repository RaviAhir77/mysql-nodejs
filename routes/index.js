import express from 'express';
import router from './auth.js';


const initialize = (app) => {
    app.use('/', router)
    
}

export default initialize;