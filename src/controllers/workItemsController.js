const azdev = require('azure-devops-node-api');

const getWorkItems = async (req, res) => {
  console.log('Request body: ', req.body);
  console.log('Request headers: ', req.headers);

  const params = {
    project: req.body.projectName,
    username: req.body.username,
  };

  const orgUrl = `https://dev.azure.com/${process.env.ADO_ORG}`;
  let authHandler = azdev.getPersonalAccessTokenHandler(process.env.ADO_PAT);
  let connection = new azdev.WebApi(orgUrl, authHandler);
  const witApi = await connection.getWorkItemTrackingApi();
  const projectApi = await connection.getCoreApi();

  projectApi.getProject(params.project).then((project) => {
    console.log(project);
  });

  let query;

  if (params.username) {
    console.log('The user asked for work items assigned to: ', params.username);
    const username_without_slug = params.username.replace(process.env.GITHUB_ENTERPRISE_SLUG, '');
    console.log(' ** username_without_slug: ', username_without_slug);

    query = {
      query: `SELECT [System.Id], [System.Title], [System.State] FROM WorkItems WHERE [System.TeamProject] = '${params.project}' AND [System.AssignedTo] CONTAINS '${username_without_slug}'`,
    };
  } else {
    console.log('The user asked for all work items');
    query = {
      query: `SELECT [System.Id], [System.Title], [System.State] FROM WorkItems WHERE [System.TeamProject] = '${params.project}'`,
    };
  }

  console.log('The query is: ', query);

  const queryResult = await witApi.queryByWiql(query, { project: params.project });
  const workItemIds = queryResult.workItems.map(item => item.id);
  const workItems = await witApi.getWorkItems(workItemIds);

  res.json(workItems);
};

module.exports = {
  getWorkItems,
};