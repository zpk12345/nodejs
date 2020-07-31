/**
 * 
 * Created by zhaopengkai on 2020/2/13
 */

'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const GuideSchema = new Schema({
    title : { type: String, index: true, comment: '指引标题' },
    type : { type: Number, comment: '指引类型，0：新手指引，1：新功能介绍，2：常用功能' },
    status : { type: Number, comment: '指引状态，0：创建，1：发布' },
    isRemind : { type: Number, comment: '是否强提醒，0：否，1：是' },
    remindPage : { type: Number, comment: '强提醒页面，0：工作表列表，1：工作表详情，2：漏斗详情，3：数据源列表，4：数据集列表' },
    icon : { type: String, comment: '指引封面' },
    content : { type: String, comment: '指引简介' },
    guideStep : { type: Array, default: [], comment: '指引步骤[{stepTitle,content,icon}]' },
    createTime : { type: Date, default:Date.now(), comment: '指引创建时间' },
    publishTime : { type: Date, comment: '指引发布时间' },
  }, {
    collection: 'tbl_guide',
    safe      : null,
  });
  return mongoose.model('GuideModel', GuideSchema);
}