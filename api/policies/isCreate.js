/**
 * Created by Froggen on 2016/8/22.
 */
module.exports = function (req, res, next) {
  // 检查数据库中是否已经有用户
  // User.find().exec(function (err, users) {
  //   if (users.length) {
  //     next();
  //   } else {
  //     res.redirect('/register');
  //   }
  // });
  // if(req.body.id === 1){
  //   return next();
  // }else {
  //   res.forbidden('You are not permitted to perform this action.');
  // }
  next();
};
