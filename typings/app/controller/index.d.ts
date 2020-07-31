// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDashboard = require('../../../app/controller/dashboard');
import ExportGuide = require('../../../app/controller/guide');
import ExportHome = require('../../../app/controller/home');
import ExportWorkTable = require('../../../app/controller/work_table');

declare module 'egg' {
  interface IController {
    dashboard: ExportDashboard;
    guide: ExportGuide;
    home: ExportHome;
    workTable: ExportWorkTable;
  }
}
