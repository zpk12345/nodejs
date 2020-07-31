/**
 * Created by zhaopengkai on 2020/2/13
 */

'use strict'

const Service = require('egg').Service;

class GuideService extends Service {
	constructor(ctx) {
		super(ctx);

		this.GuideModel = ctx.app[ctx.app.config.mongoose.LoadName].GuideModel;
	}

	async addGuide(opts) {
		const count = await this.GuideModel.countDocuments(
			{ 'title': opts.title }
    );
    if (count) {
      return { code: 1003, msg: '指引标题重复，请修改！'}
    }
    return await this.GuideModel.create(opts);
  }
  
  async updateGuide(opts) {
    const tmpGuide = await this.GuideModel.findOne(
      { '_id': opts.guideId },
      { __v: 0 },
      { lean: true }
    );
    if (!tmpGuide) {
      return { code: 1003, msg: '该指引不存在或已被删除！'};
    }
    const count = await this.GuideModel.countDocuments(
			{ 'title': opts.title }
    );
    if (count) {
      return { code: 1003, msg: '指引标题重复，请修改！'}
    }
    return await this.GuideModel.updateOne({ '_id': opts.guideId }, opts);
  }

  async delGuide(opts) {
    return await this.GuideModel.deleteOne({ '_id': opts.guideId });
  }

  async getGuideList(opts) {
    const query = {};
    opts.page = opts.page || 1;
    opts.size = opts.size || 10;
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
    count = this.GuideModel.countDocuments(query);
    guideList = this.GuideModel.find(query, { __v:0 }, { lean: true})
      .sort({ publishTime: opts.sort === '-' ? -1 : 1})
      .skip((opts.page - 1) * opts.size)
      .limit(opts.size);
    return await Promise.all([count,guideList]);
  }

  async getGuide(guideId) {
    const result = await this.GuideModel.findOne(
      { '_id': guideId },
      { __v: 0},
      { lean: true}
    );
    if (result) {
      result.createTime = result.createTime && this.ctx.helper.dateFormat(result.createTime, 'YYYY-MM-DD HH:mm');
      result.publishTime = result.createTime && this.ctx.helper.dateFormat(result.publishTime, 'YYYY-MM-DD HH:mm');
    } else {
      return { code: 1003, msg: '指引不存在！'}
    }
    return result;
  }

  async getGuideListByType() {
    const query = {};
    let oldGuideList = [];
    // 只获取已发布的指引
    query.status = 1;
    oldGuideList = await this.GuideModel.find(query, { __v:0 }, { lean: true});
    const guideList =  this.ctx.helper._.groupBy(oldGuideList, o => o.type);
    return guideList;
  }
}

module.exports = GuideService;