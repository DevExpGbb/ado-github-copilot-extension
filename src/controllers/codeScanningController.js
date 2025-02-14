const codeScanningService = require('../services/codeScanningService');


const getAlerts = async (req, res) => {

    console.log('Request body: ', req.body);
    console.log('Request headers: ', req.headers);

    const params = {
        project: req.body.projectName,
        repository: req.body.repository,
        userName: req.body.username,
        currentFilePath: req.body.currentFilePath,
    };


    const alerts = await codeScanningService.getAlerts(params.project, params.repository, params.userName, params.currentFilePath);

    if (alerts) {

        // Count how many alerts are from CodeQL, how many are from Advanced Security Dependency Scanning
        const codeQLAlerts = alerts.filter(alert => alert.tools.some(tool => tool.name === 'CodeQL'));
        const dependencyAlerts = alerts.filter(alert => alert.tools.some(tool => tool.name === 'Advanced Security Dependency Scanning'));

        console.log(`CodeQL alerts: ${codeQLAlerts.length}`);
        console.log(`Advanced Security Dependency Scanning alerts: ${dependencyAlerts.length}`);
    }

    res.json(alerts);

};

module.exports = {
    getAlerts,
};