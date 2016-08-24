/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');
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
        res.json(data);
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
        console.log(user);
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
   * 处理登出逻辑
   * @param req
   * @param res
   */
  logout: function (req, res) {
    req.session.user = null;
    res.json({status:201})
  }

};

