const express = require('express');
const bodyParser = require('body-parser');
const getRouter = require('./routes/router');

const app = express();
const port = 3000;
const host = 'localhost';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', getRouter);
app.listen(port, host, () => {
  console.log(`Server sedang berjalan http://${host}:${port}`);
});
