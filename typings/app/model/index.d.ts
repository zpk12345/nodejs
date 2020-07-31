// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDashboardModel = require('../../../app/model/dashboard_model');
import ExportGuideModel = require('../../../app/model/guide_model');

declare module 'egg' {
  interface IModel {
    DashboardModel: ReturnType<typeof ExportDashboardModel>;
    GuideModel: ReturnType<typeof ExportGuideModel>;
  }
}
