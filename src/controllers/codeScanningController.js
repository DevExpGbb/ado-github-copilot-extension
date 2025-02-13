const azdev = require('azure-devops-node-api');

const getAlerts = async (req, res) => {

    console.log('Request body: ', req.body);
    console.log('Request headers: ', req.headers);

    const params = {
        project: req.body.projectName,
        repository: req.body.repository,
    };

    const orgUrl = `https://dev.azure.com/${process.env.ADO_ORG}`;
    let authHandler = azdev.getPersonalAccessTokenHandler(process.env.ADO_PAT);
    let connection = new azdev.WebApi(orgUrl, authHandler);
    const witApi = await connection.getWorkItemTrackingApi();
    const projectApi = await connection.getCoreApi();

    projectApi.getProject(params.project).then((project) => {
        console.log(project);
    });

    const alertApi = await connection.getAlertApi();

    const alerts = await alertApi.getAlerts(params.project, params.repository);

    res.json(alerts);
};

module.exports = {
    getAlerts,
};