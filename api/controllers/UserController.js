/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');
var crypto = require('crypto');
var ccap = require('ccap');
var socketio = require('socket.io');
var mysql = require('mysql');

//var captcha = ccap(width, height, offset);

var captcha = ccap({

  width:150,//set width,default is 256

  height:40,//set height,default is 60

  offset:20,//set text spacing,default is 40

  quality:50,//set pic quality,default is 50

  fontsize: 30,

  _text_len:4

  //generate:function(){//Custom the function to generate captcha text

  //generate captcha text here

  // return text;//return the captcha text

  //}

});

module.exports = {
  /**
   * 添加用户
   * @param req
   * @param res
   */
  addUser: function (req, res) {
    console.log(req.session);
     req.session.user = req.body;
    console.dir(req.session.user);
    User.create(req.body,function (err,data) {
      console.log(err+ "  " +data);
      if(err){
        return res.error(err);
      }
      return res.json(data);
    });

  },
  /**
   * 获取单个用户
   * @param req
   * @param res
   */
  getUser:function (req, res) {
    var name = req.param('name');
    User.findOne({'Name':name})
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.error(err)
      })
  },
  /**
   * 获取所有用户
   * @param req
   * @param res
   * @returns {*}
   */
  getAll:function (req, res) {
    console.log('session 验证');
    console.dir(req.session.user);
    User.find()
      .then(function (data) {
        res.json({count:data.length,data:data});
      }).catch(function (err) {
        res.send(err);
    })
  },
  /**
   * 删除用户
   * @param req
   * @param res
   */
  delUser:function (req, res) {
    User.destroy({"id":req.param('id')},function (err ,data) {
      if(err){
        res.json(err);
      }
      res.json(data);
    });
      // .then(function (data) {
      //   res.json(data);
      // })
      // .catch(function (err) {
      //   res.error(err);
      // })
  },
  /**
   * 用户登录
   * @param req
   * @param res
   */
  login : function (req, res) {
    var user = req.body;
    User.findOne({'Name':user.name})
      .then(function (data) {
        sails.log(user);
        console.log("====================");
        console.dir(data);
        if(!data){
          res.json('用户不存在')
        }else {
          console.log(data);
          if (data.password === user.password){
            req.session.user = data;
            res.json({status:200});
          }else {
            res.json('密码错误');
          }
        }
      })
      .catch(function (err) {
        res.json(err)
      })
  },
  /**
   * 生成验证码
   * @param req
   * @param res
   */
  vcode:function (req, res) {
    if(req.url == '/favicon.ico')return res.end('');//Intercept request favicon.ico

    var ary = captcha.get();

    var txt = ary[0];

    var buf = ary[1];

    res.end(buf);
    req.session.icode = txt;
    //req.session.user = null;
    console.log(req.session.icode);
    res.json({status:201})
  },
  /**
   * 处理登出逻辑
   * @param req
   * @param res
   */
  logout: function (req, res) {
    req.session.user = null;
    res.json({status:201})
  },
  /**
   * md5加密
   * @param req
   * @param res
   */
  md5 : function (req,res) {
    const secret = 'abcdefg';
    const hash = crypto.createHmac('sha256', secret)
      .update('I love cupcakes')
      .digest('hex');
    console.log(hash);

    res.json(hash);
  },
  addImg:function (req,res) {
    console.log(req.body);
    res.json({status:200})
  }
};

