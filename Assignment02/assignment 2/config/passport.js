const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = function(passport){
  // local login
  passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) return done(null, false, { message: 'Incorrect email' });
      const match = await bcrypt.compare(password, user.passwordHash);
      if (!match) return done(null, false, { message: 'Incorrect password' });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));

  // GitHub strategy
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID || 'GITHUB_CLIENT_ID',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || 'GITHUB_CLIENT_SECRET',
    callbackURL: process.env.GITHUB_CALLBACK_URL || '/auth/github/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // find or create user
      const existing = await User.findOne({ githubId: profile.id });
      if (existing) return done(null, existing);
      // create
      const newUser = new User({
        name: profile.displayName || profile.username,
        email: (profile.emails && profile.emails[0] && profile.emails[0].value) || `${profile.username}@github.com`,
        githubId: profile.id
      });
      await newUser.save();
      return done(null, newUser);
    } catch (err) {
      return done(err);
    }
  }));

  passport.serializeUser(function(user, done) { done(null, user.id); });
  passport.deserializeUser(async function(id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
