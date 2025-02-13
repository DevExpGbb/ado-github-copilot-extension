const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const adoRoutes = require('./routes/workItemsRoutes');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());

app.use('/api/workitems', adoRoutes);

module.exports = app;