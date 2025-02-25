import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs : 30 * 1000,
    max : 5,
    message : 'too many request please try again'
})

export default limiter;