/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1582262693438_692';

  // add your middleware config here
  config.middleware = [];

  // config.siteFile = {
  //   '/favicon.ico': fs.readFileSync(path.join(appInfo.baseDir, 'app/public/static/favicon.ico'))
  // };
  config.mongoose = {
    url     : 'mongodb://127.0.0.1/olap',
    LoadName: 'mongodbModel',
    LoadPath: 'app/model',
    options : {
      useNewUrlParser   : true,
      useCreateIndex    : true,
      useUnifiedTopology: true,
    },
  };

  // config.validate = {
  //   convert: false,
  //   widelyUndefined:true,
  // };
  
  // config.view = {
  //   defaultViewEngine: 'ejs',
  //   defaultExtension: '.html',
  // };
  // config.ejs = {};

  config.security = {
    csrf: {
      enable : false,
    }
  }

  config.multipart = {
    mode: 'file',
    whitelist: [ '.png', '.jpg'],
    tmpdir: 'app/public/uploadTemp'
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.uploadDir = 'app/741';

  config.static = {
    // 静态化访问前缀,如：`http://127.0.0.1:7001/static/images/logo.png`
    prefix: '/static', 
    // dir: path.join(appInfo.baseDir, 'app/public'), // `String` or `Array:[dir1, dir2, ...]` 静态化目录,可以设置多个静态化目录
    // dynamic: true, // 如果当前访问的静态资源没有缓存，则缓存静态文件，和`preload`配合使用；
    // preload: false,
    // maxAge: 31536000, // in prod env, 0 in other envs
    // buffer: true, // in prod env, false in other envs
  };

  config.onerror = {
    async all(err, ctx) {
      ctx.status = 400;
      ctx.body = 'error';
    }
  }

  return {
    ...config,
    ...userConfig,
  };
};

// exports.validate = {
//   // convert: false,
//   // validateRoot: false,
// };
