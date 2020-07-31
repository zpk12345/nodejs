/**
 * Created by zhaopengkai on 2020/3/5
 */

'use strict'

const { Controller } = require('egg');

class DashboardController extends Controller {
	/**
	* 添加仪表盘
	*
	* @name 添加仪表盘
	* @category 仪表盘
	* @httpverbs POST
	* @path /dashboard
	* @author zhaopengkai@henhaoji.com
	* @returns {JSON}
	*/
  async addDashboard() {
    const { ctx } = this;
    const imCode = ctx.session.user.imCode;
    const rets = await ctx.service.dashboard.addDashboard(imCode);
    if (rets.msg) {
      ctx.apiResult = rets;
    } else {
      ctx.apiResult = { code: 0, msg: rets };
    }
  }

	/**
	* 更新仪表盘
	*
	* @name 更新仪表盘
	* @category 仪表盘
	* @httpverbs PUT
	* @path /updateDashboard/:dashboardId
	* @author zhaopengkai@henhaoji.com
  * @parm {String} req.params.dashboardId       -仪表盘id
  * @parm {String} [req.body.zhName]            -仪表盘中文名
  * @parm {Json}} [req.body.workTables]         -选中的工作表
	* @returns {JSON}
	*/
  async updateDashboard() {
    const { ctx } = this;
    ctx.validate({
      dashboardId: { type: 'string', required: true, min: 24 },
      zhName: { type: 'string', required: false },
      isPreserve: {},
      workTables: { type: 'json', jsonType: 'array', required: false },
      workTableConfig: {},
      controls: {},
    });
    ctx.validateParams.imCode = ctx.session.user.imCode;
    const rets = await ctx.service.dashboard.updateDashboard(ctx.validateParams);
    if (rets.msg) {
      ctx.apiResult = rets;
    } else {
      ctx.apiResult = { code: 0, msg: rets };
    }
  }

	/**
	* 删除仪表盘
	*
	* @name 删除仪表盘
	* @category 仪表盘
	* @httpverbs DELETE
	* @path /delDashboard/:dashboardId
	* @author zhaopengkai@henhaoji.com
	* @parm {String} req.params.dashboardId   -仪表盘id 
	* @returns {JSON}
	*/
  async delDashboard() {
    const { ctx } = this;
    ctx.validate({
      dashboardId: { type: 'string', required: true, min: 24 },
    });
    ctx.validateParams.imCode = ctx.session.user.imCode;
    const rets = await ctx.service.dashboard.delDashboard(ctx.validateParams);
    if (rets.msg) {
      ctx.apiResult = rets;
    } else {
      ctx.apiResult = { code: 0, msg: rets };
    }
  }

	/**
	* 获取仪表盘列表
	*
	* @name 获取仪表盘列表
	* @category 仪表盘
	* @httpverbs GET
	* @path /getDashboardList
	* @author zhaopengkai@henhaoji.com
	* @parm {} 
	* @returns {JSON}
  */
  async getDashboardList() {
    const { ctx } = this;
    ctx.validate({
      type: { type: 'int', required: false },
      status: { type: 'int', required: false },
      key: { type: 'string', allowEmpty: true, required: false },
      page: { type: 'int', required: false, default: 1 },
      size: { type: 'int', required: false, default: 10 },
      sort: { type: 'enum', required: false, default: '-', values: ['', '+', '-'] },
    });
    ctx.validateParams.imCode = ctx.session.user.imCode;
    const rets = await ctx.service.dashboard.getDashboardList(ctx.validateParams);
    if (rets.msg) {
      ctx.apiResult = rets;
    } else {
      ctx.apiResult = { code: 0, msg: rets };
    }
  }

	/**
	* 获取仪表盘详情
	*
	* @name 获取仪表盘详情
	* @category 仪表盘
	* @httpverbs GET
	* @path /getDashboard/:dashboardId
	* @author zhaopengkai@henhaoji.com
	* @parm {String} req.params.dashboardId   -仪表盘id  
	* @returns {JSON}
  */
  async getDashboard() {
    const { ctx } = this;
    ctx.validate({
      dashboardId: { type: 'string', required: true, min: 24 },
    });
    ctx.validateParams.imCode = ctx.session.user.imCode;
    const rets = await ctx.service.dashboard.getDashboard(ctx.validateParams);
    if (rets.msg) {
      ctx.apiResult = rets;
    } else {
      ctx.apiResult = { code: 0, msg: rets };
    }
  }

  /**
	* 获取仪表盘左侧工作表列表
	*
	* @name 获取仪表盘左侧工作表列表
	* @category 仪表盘
	* @httpverbs GET
	* @path /getWorkTableList/:dashboardId
	* @author zhaopengkai@henhaoji.com
	* @parm {String} req.params.dashboardId   -仪表盘id  
  * @returns {JSON}
  {
	"code": 0,
	"Desc": "成功",
	"Message": {
 		includeTable: [         //包含的工作表
			{
				"_id":"2fjb7badjsfjf8dsnda",
				"zhName": 未命名工作表,
				"type": 0
			},{},{}	
		],
		allList: {				//所有保存的工作表
			"0":[				//分类
				{
 					"_id":"2fjb7badjsfjf8dsnda",
 					"zhName": 未命名工作表,
 					"type": 0
 				},
				{
 					"_id":"2fjb7badjsfjf8dsnda",
 					"zhName": 未命名工作表,
 					"type": 0,
					"isInclude": true     //是否在被包含的表里，有则是，无则否
 				}
			],
			"3":[...],
			"4":[...]
		  }
	  }
  }
  */
  async getWorkTableList() {
    const { ctx } = this;
    ctx.validate({
      dashboardId: { type: 'string', required: true, min: 24 },
    });
    ctx.validateParams.imCode = ctx.session.user.imCode;
    const rets = await ctx.service.dashboard.getWorkTableList(ctx.validateParams);
    if (rets.msg) {
      ctx.apiResult = rets;
    } else {
      ctx.apiResult = { code: 0, msg: rets };
    }
  }

  /**
   * 获取工作表被仪表盘使用的情况
   *
   * @name 获取工作表被仪表盘使用的情况
   * @category 仪表盘
   * @httpverbs GET
   * @path /getUseDashboard/:tableId
   * @author zhaopengkai@henhaoji.com
   * @parm {String} req.params.tableId   -工作表id 
   * @returns {JSON}
   * {
   *   "code": 0,
   *   "Desc": "成功",
   *   "Message": [
   *     {
   *       "_id": "5dsdf45454sfd5f4d5sf4",
   *       "zhName": "未命名仪表盘"
   *     },
   *     {
   *       "_id": "5dsdf45454sfd5f4d5sf4",
   *       "zhName": "未命名仪表盘1"
   *     },
   *   ]
   * }
   */
	async getUseDashboard() {
    const { ctx } = this;
    ctx.validate({
      tableId: { type: 'string', required: true, min: 24 },
    });
    ctx.validateParams.imCode = ctx.session.user.imCode;
    const rets   = await ctx.service.dashboard.getUseDashboard();
    if (rets.msg) {
      ctx.apiResult = rets;
    } else {
      ctx.apiResult = { code: 0, msg: rets };
    }
  }
  

}

module.exports = DashboardController;