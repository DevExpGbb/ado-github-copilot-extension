const azdev = require('azure-devops-node-api');

const getAlerts = async (projectName, repository, username, currentFilePath) => {

    console.log(`Looking for alerts in project ${projectName}, repository ${repository}, user ${username}, file ${currentFilePath}`);

    const orgUrl = `https://dev.azure.com/${process.env.ADO_ORG}`;
    let authHandler = azdev.getPersonalAccessTokenHandler(process.env.ADO_PAT);
    let connection = new azdev.WebApi(orgUrl, authHandler);
    const projectApi = await connection.getCoreApi();

    projectApi.getProject(projectName).then((project) => {
        console.log(project);
    });

    const alertApi = await connection.getAlertApi();

    return await alertApi.getAlerts(projectName, repository);

}

module.exports = {
    getAlerts,
};