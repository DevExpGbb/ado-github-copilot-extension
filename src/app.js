const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const adoRoutes = require('./routes/adoRoutes');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());

app.use('/api/ado', adoRoutes);

module.exports = app;