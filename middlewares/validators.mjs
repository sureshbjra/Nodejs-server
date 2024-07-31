import { body, validationResult } from 'express-validator';

const validateLogin = [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').isLength({ min: 3, max: 5 })
        .withMessage('Password must be between 3 and 5 characters long')
];

const validateRegister = [
    body('firstName')
        .isString().withMessage('First name must be a string')
        .notEmpty().withMessage('First name is required'),

    body('lastName')
        .isString().withMessage('Last name must be a string')
        .notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password')
        .isLength({ min: 2 }).withMessage('Password must be at least 6 characters long')
        .notEmpty().withMessage('Password is required'),

    body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        })
        .notEmpty().withMessage('Confirm password is required')
];

export { validateLogin, validateRegister };