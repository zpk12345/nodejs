/**
 * Created by zhaopengkai on 2020/2/13
 */

'use strict'

const Service = require('egg').Service;

class GuideService extends Service {
	constructor(ctx) {
		super(ctx);

		this.WorkTableModel = ctx.app[ctx.app.config.mongoose.LoadName].WorkTableModel;
  }
    
  async saveAsWorkTable(opts) {
    const count = await this.WorkTableModel.countDocuments(
      { 'zhName': opts.workTable.zhName, 'imCode': opts.imCode }
    );
    if (count) {
      return { code: 1003, msg: '工作表名称重复，请修改！' };
    }
    delete opts.workTable._id;
    return await this.WorkTableModel.create(opts.workTable);
  }

  async backWorkTable(opts) {
    const tmpWorkTableInfo = await this.WorkTableModel.findOne(
      { '_id': opts.workTable._id, 'imCode': opts.imCode }
    );
    if (!tmpWorkTableInfo) {
      return { code: 1003, msg: '该工作表不存在或非本人工作表。' };
    }
    return await this.WorkTableModel.updateOne({'_id': opts.workTable._id, 'imCode': opts.imCode }, opts.workTable);
  }



	
}

module.exports = GuideService;