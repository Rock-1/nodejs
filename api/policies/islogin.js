/**
 * 用户是否登录
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports = function (req, res, next) {
    if (req.session.user){
        return next();
    }
    else {
        return res.json({params:'Please log in first'});
    }
};
