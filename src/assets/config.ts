import {RouterConfig} from "../app/data-objects/config";

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
    '^/login',
    '^/parcelManagement'
  ]
};
