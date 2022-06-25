exports.isUser = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/auth/login");
  }
  next();
};
exports.isGuest = (req, res, next) => {
  if (req.user) {
    return res.redirect("/");
  }
  next();
};
