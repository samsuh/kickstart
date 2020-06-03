const routes = require("next-routes")();

//add a route if a user navigates to firstArgument and show the page at secondArgument
//:denotes wildcard
routes
  .add("/campaigns/new", "/campaigns/new")
  .add("/campaigns/:address", "campaigns/show")
  .add("/campaigns/:address/requests", "campaigns/requests/index");

module.exports = routes;
