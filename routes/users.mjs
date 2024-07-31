import express from 'express';
import { validationResult } from 'express-validator';
import { loginRateLimiter, registerRateLimiter } from '../middlewares/rateLimiter.mjs';
import { validateLogin, validateRegister } from '../middlewares/validators.mjs';
import User from '../models/User.mjs';

const router = express.Router();

router.post('/login', loginRateLimiter, validateLogin, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email!' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password!' });
    res.status(200).json({ message: 'Login successful', user });
});

router.post('/register', registerRateLimiter, validateRegister, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { firstName, lastName, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
        return res.status(200).json({ message: 'User already exists', user });
    }
    user = new User({ firstName, lastName, email, password });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
});

export default router;