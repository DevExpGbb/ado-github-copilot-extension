const azdev = require('azure-devops-node-api');

const getWorkItemsByUser = async (project, username, pat) => {
  const orgUrl = `https://dev.azure.com/${process.env.ADO_ORG}`;
  const authHandler = azdev.getPersonalAccessTokenHandler(pat);
  const connection = new azdev.WebApi(orgUrl, authHandler);
  const witApi = await connection.getWorkItemTrackingApi();

  let query;
  const usernameWithoutSlug = username.replace(process.env.GITHUB_ENTERPRISE_SLUG, '');

  query = {
    query: `SELECT [System.Id], [System.Title], [System.State] FROM WorkItems WHERE [System.TeamProject] = '${project}' AND [System.AssignedTo] CONTAINS '${usernameWithoutSlug}'`,
  };

  const queryResult = await witApi.queryByWiql(query, { project });
  const workItemIds = queryResult.workItems.map(item => item.id);
  const workItems = await witApi.getWorkItems(workItemIds);

  return workItems;
};

module.exports = {
  getWorkItemsByUser,
};