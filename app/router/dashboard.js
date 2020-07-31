/**
 * 
 * Created by zhaopengkai on 2020/2/14.
 */

'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 获取工作表被仪表盘使用的情况
  router.get('/getUseDashboard/:tableId', controller.dashboard.getUseDashboard);
  // 工作表另存为
  router.post('/saveAsWorkTable', controller.workTable.saveAsWorkTable);
  // 工作表还原接口
  router.post('/backWorkTable', controller.workTable.backWorkTable)
  // 添加仪表盘
  router.post('/dashboard', controller.dashboard.addDashboard);
  // 更新仪表盘
  router.put('/updateDashboard/:dashboardId', controller.dashboard.updateDashboard);
  // 删除仪表盘
  router.delete('/delDashboard/:dashboardId', controller.dashboard.delDashboard);
  // 获取仪表盘列表
  router.get('/getDashboardList', controller.dashboard.getDashboardList);
  // 获取仪表盘详情
  router.get('/getDashboard/:dashboardId', controller.dashboard.getDashboard);
  // 获取仪表盘左侧工作表列表
  router.get('/getWorkTableList/:dashboardId', controller.dashboard.getWorkTableList);
};