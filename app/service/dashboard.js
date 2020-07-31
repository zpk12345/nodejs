/**
 * Created by zhaopengkai on 2020/3/5
 */

'use strict'

const Service = require('egg').Service;

class DashboardService extends Service {
	constructor(ctx) {
		super(ctx);

    this.DashboardModel = ctx.app[ctx.app.config.mongoose.LoadName].DashboardModel;
    this.TwiceFindModel = ctx.app[ctx.app.config.mongoose.LoadName].TwiceFindModel;
    this.WorkTableModel = ctx.app[ctx.app.config.mongoose.LoadName].WorkTableModel;
	}

	async addDashboard(opts) {
    const tmpName = '未命名仪表盘';
		const dashboards = await this.DashboardModel.find(
      { imCode: opts.imCode, zhName: new RegExp(tmpName) },
      { __v: 0 },
      {lean: true}
    );
    let count = 0;
    for (const tmpDash of dashboards) {
      const tmpNumber = Number(tmpDash.zhName.replace(tmpName, '')) + 1;
      count = tmpNumber > count ? tmpNumber : count;
    }
    opts.zhName = `${tmpName}${count ? count : ''}`;
    opts.createTime = new Date();
    opts.modifyTime = new Date();
    return await this.DashboardModel.create(opts);
  }
  
  async updateDashboard(opts) {
    const tmpDashboard = await this.DashboardModel.findOne(
      { '_id': opts.dashboardId, 'imCode': opts.imCode },
      { __v: 0 },
      { lean: true }
    );
    if (!tmpDashboard) {
      return { code: 1003, msg: '该仪表盘不存在或已被删除！'};
    }
    const count = await this.DashboardModel.countDocuments(
			{ 'zhName': opts.zhName }
    );
    if (count) {
      return { code: 1003, msg: '仪表盘中文名重复，请修改！'}
    }
    return await this.GuideModel.updateOne({ '_id': opts.dashboardId }, opts);
  }

  async delDashboard(opts) {
    return await this.DashboardModel.deleteOne({ '_id': opts.dashboardId, 'imCode': opts.imCode });
  }

  async getDashboardList(opts) {
    const query = {};
    opts.page = opts.page || 1;
    opts.size = opts.size || 10;
    query.imCode = opts.imCode;
    let count = 0;
    let guideList = [];
    if (opts.type) {
      query.type = opts.type;
    }
    if (opts.status) {
      query.status = opts.status;
    }
    if (opts.key) {
      query.title = new RegExp(opts.key);
    }
    count = this.DashboardModel.countDocuments(query);
    guideList = this.DashboardModel.find(query, { __v:0 }, { lean: true})
      .sort({ publishTime: opts.sort === '-' ? -1 : 1})
      .skip((opts.page - 1) * opts.size)
      .limit(opts.size);
    return await Promise.all([count,guideList]);
  }

  async getDashboard(opts) {
    const result = await this.DashboardModel.findOne(
      { '_id': opts.dashboardId, 'imCode': opts.imCode },
      { __v: 0},
      { lean: true}
    );
    if (result) {
      result.createTime = result.createTime && this.ctx.helper.dateFormat(result.createTime, 'YYYY-MM-DD HH:mm');
      result.modifyTime = result.createTime && this.ctx.helper.dateFormat(result.modifyTime, 'YYYY-MM-DD HH:mm');
    } else {
      return { code: 1003, msg: '仪表盘不存在或者非本人仪表盘！'};
    }
    return result;
  }

  async getWorkTableList(opts) {
    const result = await this.DashboardModel.findOne(
      { '_id': opts.dashboardId, 'imCode': opts.imCode },
      { __v: 0},
      { lean: true}
    );
    if (!result) {
      return { code: 1003, msg: '仪表盘不存在或者非本人仪表盘！'};
    }
    let includeTable = [];
    let allList = [];
    const includeTable = await this.WorkTableModel.find({ '_id':{ $in: result.workTables }, 'imCode': opts.imCode }, { _id: 1, zhName: 1, type: 1 }, { lean: true });
    let allList = await this.WorkTableModel.find({ 'imCode': opts.imCode, 'tableType': 'work', 'status': 2 }, { _id: 1, zhName: 1, type: 1 }, { lean: true });
    allList.forEach(data => {
      if (includeTable.find(work => work._id === data._id)) {
        data.isInclude = true;
      }
    });
    allList = this.ctx.helper._.groupBy(allList, 'type');
    return { includeTable, allList };
  }

  async getUseDashboard(opts) {
    const list = await this.DashboardModel.find(
      { imCode: opts.imCode, workTables: opts.tableId },
      { _id: 1, zhName: 1 },
      { lean: true }
    );
    return list;
  }
 
}

module.exports = DashboardService;