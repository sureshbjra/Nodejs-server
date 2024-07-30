import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const _port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '/UI/user-app/build')));

app.use(express.json());

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/UI/user-app/build', 'index.html'));
});

app.listen(_port, () => {
    console.log(`http://localhost:${_port}`);
})