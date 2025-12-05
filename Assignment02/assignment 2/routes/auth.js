const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');

function ensureNotAuthenticated(req, res, next){
  if (req.isAuthenticated()) return res.redirect('/items');
  next();
}

/* Register page */
router.get('/register', ensureNotAuthenticated, (req, res) => {
  res.render('auth/register');
});

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password, password2 } = req.body;
    if (!email || !password || password !== password2) {
      req.flash('error', 'Please enter valid data and matching passwords.');
      return res.redirect('/auth/register');
    }
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      req.flash('error', 'Email already registered.');
      return res.redirect('/auth/register');
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new User({ name, email: email.toLowerCase(), passwordHash: hash });
    await user.save();
    req.flash('success', 'Registration successful. Please log in.');
    res.redirect('/auth/login');
  } catch (err) {
    next(err);
  }
});

/* Login */
router.get('/login', ensureNotAuthenticated, (req, res) => {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/items',
  failureRedirect: '/auth/login',
  failureFlash: true
}));

/* GitHub OAuth */
router.get('/github', passport.authenticate('github', { scope: [ 'user:email' ] }));
router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/auth/login',
  failureFlash: true
}), (req, res) => {
  res.redirect('/items');
});

/* Logout */
router.get('/logout', (req, res) => {
  req.logout(() => {
    req.flash('success', 'Logged out');
    res.redirect('/');
  });
});

module.exports = router;
