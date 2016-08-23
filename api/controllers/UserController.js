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
    console.log(passport);
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
    User.find()
      .then(function (data) {
        res.json(data);
      }).catch(function (err) {
        res.error(err);
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
        res.error(err);
      }
      res.json(data);
    });
      // .then(function (data) {
      //   res.json(data);
      // })
      // .catch(function (err) {
      //   res.error(err);
      // })
  }

};

