/**
 * Created by Froggen on 2016/8/24.
 */
/**
 * 判断用户是否是管理员
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports = function (req, res, next) {
  if(!req.session.user){
    return res.json({params:'Please login'});
  }
  if (req.session.user.isAdmin){
    return next();
  }
  else {
    return res.json({params:'Please log on with administrator '});
  }
};
