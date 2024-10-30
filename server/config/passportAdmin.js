// passportAdmin.js
require('dotenv').config();
const JwtStrategy = require('passport-jwt').Strategy;
const passport = require('passport');
const AdminUser = require('../models/User');

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['admin'];
  }
  return token;
};

const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET,
};

passport.use('admin', new JwtStrategy(options, async (jwtPayload, done) => {
  try {
    const adminUser = await AdminUser.findById(jwtPayload.id);
    if (adminUser) {
      return done(null, adminUser);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
}));

module.exports = passport;
