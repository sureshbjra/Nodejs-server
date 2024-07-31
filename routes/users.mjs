import express from 'express';
import { validationResult } from 'express-validator';
import { loginRateLimiter, registerRateLimiter } from '../middlewares/rateLimiter.mjs';
import { validateLogin, validateRegister } from '../middlewares/validators.mjs';
import User from '../models/User.mjs';
import nodemailer from 'nodemailer';

const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

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
    const activationToken = user.generateActivationToken();
    await user.save();
    const activationLink = `http://localhost:3010/activate/${activationToken}`;

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Activate Your Account',
        text: `Please activate your account by clicking the following link: ${activationLink}`
    };

    console.log(mailOptions);

    res.status(201).json({ message: 'User created successfully', user });

    //command the mailer code
    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         return res.status(500).send('Error sending email');
    //     }
    //     res.status(200).send(`Registration successful! Please check your email to activate your account.`);
    // });
});

router.get('/activate/:token', async (req, res) => {
    const { token } = req.params;

    try {
        const user = await User.findOne({ activationToken: token });

        if (!user || !user.isTokenValid(token)) {
            return res.status(400).send('Invalid or expired token');
        }

        user.isActive = true;
        user.activationToken = undefined;
        user.tokenExpires = undefined;
        await user.save();

        res.status(200).send('Account activated successfully!');
    } catch (error) {
        res.status(500).send('Server error');
    }
});

export default router;