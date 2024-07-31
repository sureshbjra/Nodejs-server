import express from 'express';
import path from 'path';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import users from './routes/users.mjs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import connectDB from './middlewares/connectDB.mjs';
import fs from 'fs';
dotenv.config();
const _port = process.env.PORT || 3000;
connectDB(process.env.MONGO_URL);

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/UI/user-app/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/UI/user-app/build', 'index.html'));
});

app.use('/api', users);

app.listen(_port, () => {
    console.log(`http://localhost:${_port}`);
})