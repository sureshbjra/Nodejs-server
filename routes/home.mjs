import express from 'express';
const router = express.Router();

// Redirect from home URL to a dynamic route
router.get('/', (req, res) => {
    const dynamicId = '123'; // Example dynamic ID
    res.redirect(`/items/${dynamicId}`);
});

export default router;