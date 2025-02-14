const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const workItemsRoutes = require('./routes/workItemsRoutes');
const codeScanningRoutes = require('./routes/codeScanningRoutes');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());


/*
Retrieves the work items from Azure DevOps for a given project. Pass the GitHub handle as input, and the output will be the name of the work item, its state, 
the assignee, and a URL in this format: https://dev.azure.com/returngisorg/{project_name}/_workitems/edit/{work_item_id}/
*/

/* JSON schema
{
  "type": "object",
  "properties": {
    "username": {
      "type": "string",
      "description": "GitHub handle"
    },
    "projectName": {
      "type": "string",
      "description": "The name of the project on Azure DevOps"
    }
  }
}
*/
app.use('/api/workitems', workItemsRoutes);

/*
Retrieves the code scanning alerts from Azure DevOps for a given project. Pass the GitHub handle as input, and the current file path and the name of the repository.
*/

/* JSON schema
{
  "type": "object",
  "properties": {
    "username": {
      "type": "string",
      "description": "GitHub handle"
    },
    "projectName": {
      "type": "string",
      "description": "The name of the project on Azure DevOps"
    },
    "repository": {
      "type": "string",
      "description": "The name of the workspace or repository"
    },
    "currentFilePath": {
      "type": "string",
      "description": "The path of the file in the repository"
    }
  }
}
*/
app.use('/api/code-scanning', codeScanningRoutes)

module.exports = app;