/**
 * 
 * Created by zhaopengkai on 2020/3/4
 */

'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const DashboardSchema = new Schema({
    zhName         : { type: String, index: true, comment: '仪表盘中文名' },
    imCode         : { type: Number, index: true, comment: '创建人im' },
    userName       : { type: String, comment: '创建人中文名' },
    type           : { type: Number, default: 0, comment: '仪表盘分类，默认为0' },
    isPreserve     : { type: Number, default: 0, comment: '是否保存：未保存：0，已保存：1' },
    createTime     : { type: Date, default: Date.now(), comment: '仪表盘创建时间' },
    modifyTime     : { type: Date, default: Date.now(), comment: '仪表盘更新时间' },
    workTables     : { type: Array, default: [], comment: '选中的工作表' },
    workTableConfig: { type: Object, default: {}, comment: '工作表样式配置' },
    controls       : { type: Object, default: {}, comment: '仪表盘控件' },
  }, {
    collection: 'tbl_dashboard',
    safe      : null,
  });
  return mongoose.model('DashboardModel', DashboardSchema);
}