'use strict';

const Controller = require('egg').Controller;
const fs = require('mz/fs');
const path = require('path');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // await ctx.render('index');
    ctx.body = '<!DOCTYPE html> ' +
'<html lang="en">'+
'<head>'+
    '<meta charset="UTF-8">'+
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">'+
    '<title>Document</title>'+
'</head>'+
'<body>'+
    '<form method="POST" action="/upload" enctype="multipart/form-data">'+
        'title: <input name="title" />'+
        'file: <input name="file" type="file" />'+
        '<button type="submit">Upload</button>'+
    '</form>'+
'</body>'+
'</html>';
  }
// async index() {
//   const { ctx } = this;
//   // await ctx.render('index');
//   ctx.body = 'hello world';
// }

  async upload() {
    const { ctx } = this;
    const rets = await ctx.service.file.upload();
    if (rets.msg) {
      ctx.apiResult = rets;
    } else {
      ctx.body = rets;
    }
  }

  async ceshi() {
    const { ctx } = this;
    ctx.validate({
      id: { type: 'string', required: true },
    });
    console.log(ctx.validateParams.id);
    ctx.body = ctx.validateParams.id;
  }
  async login() {
    
  }
}

module.exports = HomeController;
