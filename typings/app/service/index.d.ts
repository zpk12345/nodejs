// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportDashboard = require('../../../app/service/dashboard');
import ExportFile = require('../../../app/service/file');
import ExportGuide = require('../../../app/service/guide');
import ExportWorkTable = require('../../../app/service/work_table');

declare module 'egg' {
  interface IService {
    dashboard: AutoInstanceType<typeof ExportDashboard>;
    file: AutoInstanceType<typeof ExportFile>;
    guide: AutoInstanceType<typeof ExportGuide>;
    workTable: AutoInstanceType<typeof ExportWorkTable>;
  }
}
