import rateLimit from 'express-rate-limit';

const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 5 login requests per windowMs
    message: 'Your try to login too many times,so please try again after few minutes'
});

const registerRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 5 login requests per windowMs
    message: 'Your try to login too many times,so please try again after few minutes'
});

export { loginRateLimiter, registerRateLimiter };