import express from 'express';

const app = express();
const _port = process.env.PORT || 3000;

app.use(express.json());

app.listen(_port, () => {
    console.log(`http://localhost:${_port}`);
})