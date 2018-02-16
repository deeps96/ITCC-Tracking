import {RouterConfig} from "../app/config";

export const ROUTER_CONFIG: RouterConfig = {
  serverAddress: 'http://localhost:2018',
  allowedUserRoutes: [
    '^$',
    '^/login'
  ],
  allowedAdminRoutes: [
    '.*'
  ],
  allowedStaffRoutes: [
    '^$',
    '^/login'
  ]
};
