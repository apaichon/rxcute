/*!
 * Copyright(c) 2017 Apaichon Punopas
 * MIT Licensed
 */

"use strict";
module.exports = function() {
  var _this = this;
  const RCMD = 'RScript --vanilla';
  const fs = require('fs');

  const fileExist = (path) => {
     return fs.existsSync(path);
  }

  const childExec = require('child_process').exec ;
  const childExecSync = require('child_process').execSync ;
  var result = {status:200, output: {}};

  const prepareScript = (rScript, args, opts) => {
    if (!fileExist(rScript)){
      throw `${rScript} is not found!`;
    }
    var params = "";

    if(args){
      params = "'" + JSON.stringify(args) + "'";
    }

    if(typeof opts !== 'function'){
      params += " " + opts;
    }

    return `${RCMD} ${rScript} ${params}`;
  }

  const exec = (rScript, args, opts, callback) => {
    var script = prepareScript(rScript, args, opts);

    _this._callback = callback || opts ;

    if(typeof opts === 'function'){
      _this._callback = opts;
    }
    childExec(script, (err, stdout, stderr) => {
      if (err) {
        result.status = 500;
        result.output = err;
      }
      else {
        result.output = stdout;
      }
      _this._callback(result)
    });
  }

  const execSync = (rScript, args, opts, callback) => {
    var script = prepareScript(rScript, args, opts);
    return childExecSync(script);
  }

  return {exec: exec, execSync: execSync}
}
