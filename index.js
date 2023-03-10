require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.SERVER_PORT;
const { contentRouter, collectionRouter } = require('./src/routes');
const db = require('./src/models');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({
    extended: true 
}));
app.use(express.text());
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8100'],
    credentials: true
}));
app.use('/api/content', contentRouter);
app.use('/api/collection', collectionRouter);

db.sequelize.sync({
    force: false 
}).then(() => {
    app.listen(port, () => {
        console.log(`Backend server running at http://${process.env.SERVER_HOST}:${port}`);
    });
});
