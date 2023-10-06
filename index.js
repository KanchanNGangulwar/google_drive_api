const express = require('express');
const router = require('./router');
const path = require('path');

const app = express();
const port = 4000;
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
