const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const workItemsRoutes = require('./routes/workItemsRoutes');
const codeScanningRoutes = require('./routes/codeScanningRoutes');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());

app.use('/api/workitems', workItemsRoutes);
app.use('/api/code-scanning', codeScanningRoutes)

module.exports = app;