const azdev = require('azure-devops-node-api');

const getAlerts = async (req, res) => {

    console.log('Request body: ', req.body);
    console.log('Request headers: ', req.headers);

    const params = {
        project: req.body.projectName,
        repository: req.body.repository,
        userName: req.body.username,
        currentFilePath: req.body.currentFilePath,
    };

    const orgUrl = `https://dev.azure.com/${process.env.ADO_ORG}`;
    let authHandler = azdev.getPersonalAccessTokenHandler(process.env.ADO_PAT);
    let connection = new azdev.WebApi(orgUrl, authHandler);
    const projectApi = await connection.getCoreApi();

    projectApi.getProject(params.project).then((project) => {
        console.log(project);
    });

    const alertApi = await connection.getAlertApi();

    const alerts = await alertApi.getAlerts(params.project, params.repository);

    if (alerts) {

        // Count how many alerts are from CodeQL, how many are from Advanced Security Dependency Scanning
        const codeQLAlerts = alerts.filter(alert => alert.tool.name === 'CodeQL');
        const asdsAlerts = alerts.filter(alert => alert.tool.name === 'Advanced Security Dependency Scanning');

        console.log(`CodeQL alerts: ${codeQLAlerts.length}`);
        console.log(`Advanced Security Dependency Scanning alerts: ${asdsAlerts.length}`);
    }

    res.json(alerts);

};

module.exports = {
    getAlerts,
};