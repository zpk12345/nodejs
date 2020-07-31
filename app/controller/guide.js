/**
 * Created by zhaopengkai on 2020/2/13
 */

'use strict'

const { Controller } = require('egg');
const validate = require('ejs');

class guideController extends Controller {
	/**
	* 添加系统指引
	*
	* @name 添加系统指引
	* @category 系统指引
	* @httpverbs POST
	* @path /addGuide
	* @author zhaopengkai@henhaoji.com
  * @parm {String} [req.body.title]         -标题
  * @parm {Int} [req.body.type]             -类型
  * @parm {Int} [req.body.status]           -状态
  * @parm {Boolean} [req.body.isRemind]     -是否强提醒
  * @parm {Int} [req.body.remindPage]       -强提醒页面
  * @parm {String} [req.body.icon]          -封面
  * @parm {String} [req.body.content]       -简介
  * @parm {Json} [req.body.guideStep]       -指引步骤
	* @returns {JSON}
	*/
  // async addGuide() {
  //   const { ctx } = this;
  //   console.log(111);
  //   ctx.validate({
  //     title: { type: 'string', required: true },
  //     type: { type: 'int', required: true },
  //     status: { type: 'int', required: false, default: 0 },
  //     isRemind: { type: 'boolean', required: true },
  //     remindPage: { type: 'int', required: true },
  //     icon: { type: 'string', required: true },
  //     content: { type: 'string', required: true },
  //     guideStep: { type: 'json', jsonType: 'array', required: true },
  //   });
  //   const rets = await ctx.service.guide.addGuide(ctx.validateParams);
  //   if (rets.msg) {
  //     ctx.apiResult = rets;
  //   } else {
  //     ctx.apiResult = { code: 0, msg: rets };
  //   }
  // }

  async addGuide() {
    const { ctx } = this;
    console.log(111);
    ctx.validate({
      id: { type: 'string', required: true },
    });
    const rets = await ctx.service.guide.addGuide(ctx.validateParams);
    if (rets.msg) {
      ctx.apiResult = rets;
    } else {
      ctx.apiResult = { code: 0, msg: rets };
    }
  }

	/**
	* 修改系统指引
	*
	* @name 修改系统指引
	* @category 系统指引
	* @httpverbs PUT
	* @path /updateGuide/:guideId
	* @author zhaopengkai@henhaoji.com
  * @parm {String} req.params.guideId       -指引id
  * @parm {String} [req.body.title]         -标题
  * @parm {Int} [req.body.type]             -类型
  * @parm {Int} [req.body.status]           -状态 
  * @parm {Boolean} [req.body.isRemind]     -是否强提醒
  * @parm {Int} [req.body.remindPage]       -强提醒页面
  * @parm {String} [req.body.icon]          -封面
  * @parm {String} [req.body.content]       -简介
  * @parm {Json} [req.body.guideStep]       -指引步骤
	* @returns {JSON}
	*/
  async updateGuide() {
    const { ctx } = this;
    ctx.validate({
      guideId: { type: 'string', required: true, min: 24 },
      title: { type: 'string', required: false },
      type: { type: 'int', required: false },
      status: { type: 'int', required: false, default: 0 },
      isRemind: { type: 'boolean', required: false },
      remindPage: { type: 'int', required: false },
      icon: { type: 'string', required: false },
      content: { type: 'string', required: false },
      guideStep: { type: 'json', jsonType: 'array', required: false },
    });
    const rets = await ctx.service.guide.updateGuide(ctx.validateParams);
    if (rets.msg) {
      ctx.apiResult = rets;
    } else {
      ctx.apiResult = { code: 0, msg: rets };
    }
  }

	/**
	* 删除系统指引
	*
	* @name 删除系统指引
	* @category 系统指引
	* @httpverbs DELETE
	* @path /delGuide/:guideId
	* @author zhaopengkai@henhaoji.com
	* @parm {String} req.params.guideId   -指引id 
	* @returns {JSON}
	*/
  async delGuide() {
    const { ctx } = this;
    ctx.validate({
      guideId: { type: 'string', required: true, min: 24 },
    });
    const rets = await ctx.service.guide.delGuide(ctx.validateParams);
    if (rets.msg) {
      ctx.apiResult = rets;
    } else {
      ctx.apiResult = { code: 0, msg: rets };
    }
  }

	/**
	* 获取指引配置列表
	*
	* @name 获取指引配置列表
	* @category 系统指引
	* @httpverbs GET
	* @path /getGuideList
	* @author zhaopengkai@henhaoji.com
	* @parm {} 
	* @returns {JSON}
  */
  async getGuideList() {
    const { ctx } = this;
    ctx.validate({
      type: { type: 'int', required: false },
      status: { type: 'int', required: false },
      key: { type: 'string', allowEmpty: true, required: false },
      page: { type: 'int', required: false, default: 1 },
      size: { type: 'int', required: false, default: 10 },
      sort: { type: 'enum', required: false, default: '-', values: ['', '+', '-'] },
    });
    const rets = await ctx.service.guide.getGuideList(ctx.validateParams);
    if (rets.msg) {
      ctx.apiResult = rets;
    } else {
      ctx.apiResult = { code: 0, msg: rets };
    }
  }

	/**
	* 获取指引详情
	*
	* @name 获取指引详情
	* @category 系统指引
	* @httpverbs GET
	* @path /getGuide/:guideId
	* @author zhaopengkai@henhaoji.com
	* @parm {String} req.params.guideId   -指引id  
	* @returns {JSON}
  */
  async getGuide() {
    const { ctx } = this;
    ctx.validate({
      guideId: { type: 'string', required: true, min: 24 },
    });
    const rets = await ctx.service.guide.getGuide(ctx.validateParams.guideId);
    if (rets.msg) {
      ctx.apiResult = rets;
    } else {
      ctx.apiResult = { code: 0, msg: rets };
    }
  }

	/**
	* 分类获取指引配置列表
	*
	* @name 分类获取指引配置列表
	* @category 系统指引
	* @httpverbs GET
	* @path /getGuideListByType
	* @author zhaopengkai@henhaoji.com
	* @returns {JSON}
  */
  async getGuideListByType() {
    const { ctx } = this;
    const rets = await ctx.service.guide.getGuideListByType();
    if (rets.msg) {
      ctx.apiResult = rets;
    } else {
      ctx.apiResult = { code: 0, msg: rets };
    }
  }
}

module.exports = guideController;