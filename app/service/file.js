'use strict'

const Service = require('egg').Service;

const fs = require('fs');
const path = require('path');
const util = require('util');
const access = util.promisify(fs.access);
const mkdir = util.promisify(fs.mkdir);

class FileService extends Service {
    async upload() {
      const { ctx, config } = this;
      const file = ctx.request.files[0];
      try {
        const fileName = path.basename(file.filename);
        const exists = await new Promise((resolve, reject) => {
          fs.stat(config.uploadDir, (err, stat) => {
            if (err) {
              return resolve(false)
            }
            resolve(stat.isDirectory());
          })
        });
        console.log(exists)
        if (!exists) await this.foundDir(config.uploadDir);
        // console.log(await access(config.uploadDir))
        // if (!access(config.uploadDir)) mkdir(config.uploadDir);
        // fs.access(config.uploadDir, fs.constants.F_OK,err=>{
        //   console.log(err)
        //   //    文件和目录不存在的情况下；
        //   if(err.code == "ENOENT"){
        //     mkdir(config.uploadDir);
        //   }
        //   });
        //await this.accessdir(config.uploadDir);
        // const targetDir = path.join(`${config.uploadDir}`, 'IMG');
        // if (!access(targetDir)) mkdir(targetDir);
        // const targetPath = path.join(targetDir, `${fileName}`);
        // const result = await this.readAndWriteFile(file, targetPath);
        // if (result) return `IMG/${fileName}`;
        return true;
      } catch (err) {
        ctx.logger.error(`文件上传失败，error：${err}`);
        return { code: 1001, msg: err.message };
      } finally {
        ctx.cleanupRequestFiles();
      }
    }

    foundDir(dir) {
      return new Promise((resolve, reject) => {
        fs.mkdir(dir, err => {
          console.log(err)
          if (err) {
            resolve(false)
          } else {
            resolve(true);
          }
        })
      })
    }
    // async readAndWriteFile(file, targetPath) {
    //   return new Promise((resolve, reject) => {
    //     fs.readFile(file.filepath, (err,data) => {
    //       if (err) {
    //         reject(err);
    //       } else {
    //         resolve(data);
    //       }
    //     });
    //   }).then(
    //     value => {
    //       return new Promise((resolve, reject) => {
    //         fs.writeFile(targetPath, value, err => {
    //         if (err) {
    //           reject(err);
    //         } else {
    //           resolve();
    //         }
    //       })
    //     });
    //     },
    //     reason => {
    //       throw reason;
    //     }
    //   ).then(
    //     value => {
    //       return true;
    //     },
    //     reason => {
    //       throw reason;
    //     }
    //   );
    // }
    // async accessdir(uploadDir) {
    //   return new Promise((resolve, reject) => {
    //     fs.access(uploadDir, (err,data) => {
    //       if (err) {
    //         reject(err);
    //       } else {
    //         resolve(data);
    //       }
    //     });
    //   }).then(
    //     value => {
    //       fs.mkdir(uploadDir);
    //     },
    //     reason => {
    //       throw reason;
    //     }
    //   );
    // }
    // async readAndWriteFile(file, targetPath) {
    //   const readFile = util.promisify(fs.readFile);
    //   const writeFile = util.promisify(fs.writeFile);
    //   const read = await readFile(file.filepath, 'utf-8')
    //   const write = await writeFile(targetPath, read).then(
    //                   value => {
    //                     return true;
    //                   },
    //                   reason => {
    //                     throw reason;
    //                   });
      //console.log(read);
      // return new Promise((resolve, reject) => {
      //   fs.readFile(file.filepath, (err,data) => {
      //     if (err) {
      //       reject(err);
      //     } else {
      //       resolve(data);
      //     }
      //   });
      // }).then(
      //   value => {
      //     return new Promise((resolve, reject) => {
      //       fs.writeFile(targetPath, value, err => {
      //       if (err) {
      //         reject(err);
      //       } else {
      //         resolve();
      //       }
      //     })
      //   });
      //   },
      //   reason => {
      //     throw reason;
      //   }
      // ).then(
      //   value => {
      //     return true;
      //   },
      //   reason => {
      //     throw reason;
      //   }
      // );
    //   return true;
    // }
}

module.exports = FileService;