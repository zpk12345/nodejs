'use strict';
const guideRouter = require('./router/guide');
const dashboardRouter = require('./router/dashboard');
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/upload', controller.home.upload);
  router.post('/ceshi', controller.home.ceshi);

  guideRouter(app);
  dashboardRouter(app);
};
