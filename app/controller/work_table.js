/**
 * Created by zhaopengkai on 2020/2/13
 */

'use strict'

const { Controller } = require('egg');

class guideController extends Controller {
  /**
   	* 工作表另存为
    *
    * @name 工作表另存为
    * @category 工作表
    * @httpverbs POST
    * @path /saveAsWorkTable
    * @author zhaopengkai@henhaoji.com
    * @parm {String} req.body.workTable   -工作表
    * @returns {JSON}
    * {
    *   "code": 0,
    *   "Desc": "成功",
    *   "Message": [
    *     {
    *       "_id": "5dsdf45454sfd5f4d5sf4",
    *       "type": 3,
    *       "createTime": "2020-03-01T07:02:10.234z";
    *       "modifyTime": "2020-03-01T07:02:10.234z";
    *       "queryInfo" : [],
    *       ...
    *     },
    *   ]
    * }
   */
  async saveAsWorkTable(){
    ctx.validate({
      workTable: { type: 'json', jsonType:'object', required: true },
    });
    const imCode = ctx.session.user.imCode;
    const opts   = ctx.helper._.cloneDeep(ctx.validateParams);
    opts.imCode  = imCode;
    const rets   = await ctx.service.workTable.saveAsWorkTable();
    if (rets.msg) {
      ctx.apiResult = rets;
    } else {
      ctx.apiResult = { code: 0, msg: rets };
    }
  }

  /**
   	* 还原工作表
    *
    * @name 还原工作表
    * @category 工作表
    * @httpverbs POST
    * @path /backWorkTable
    * @author zhaopengkai@henhaoji.com
    * @parm {String} req.body.workTable   -工作表
    * @returns {JSON}
    * {
    *   "code": 0,
    *   "Desc": "成功",
    *   "Message": "修改成功"，
    *   "extData":{}
    * }
   */
  async backWorkTable(){
    ctx.validate({
      workTable: { type: 'json', jsonType:'object', required: true },
    });
    const imCode = ctx.session.user.imCode;
    const opts   = ctx.helper._.cloneDeep(ctx.validateParams);
    opts.imCode  = imCode;
    const rets   = await ctx.service.workTable.backWorkTable();
    if (rets.msg) {
      ctx.apiResult = rets;
    } else {
      ctx.apiResult = { code: 0, msg: rets };
    }
  }
}

module.exports = guideController;