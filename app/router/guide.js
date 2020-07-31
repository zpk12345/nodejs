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
  // 添加系统指引
  router.post('/addGuide', controller.guide.addGuide);
  // 修改系统指引
  router.put('/updateGuide/:guideId', controller.guide.updateGuide);
  // 删除系统指引
  router.delete('/delGuide/:guideId', controller.guide.delGuide);
  // 获取指引配置列表
  router.get('/getGuideList', controller.guide.getGuideList);
  // 获取指引详情
  router.get('/getGuide/:guideId', controller.guide.addGuide);
  // 分类获取指引配置列表
  router.get('/getGuideListByType', controller.guide.getGuideListByType);
};