require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const itemsRouter = require('./routes/items');

require('./config/db'); // connect mongoose
require('./config/passport')(passport); // passport config

const app = express();

// view engine setup - using express-handlebars via express-handlebars wrapper
const exphbs = require('express-handlebars');
app.engine('hbs', exphbs.create({ extname: '.hbs', defaultLayout: 'layout', layoutsDir: path.join(__dirname, 'views', 'layouts') }).engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
}));

// passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// locals for views
app.use(function(req, res, next){
  res.locals.currentUser = req.user || null;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/items', itemsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', { message: err.message, error: req.app.get('env') === 'development' ? err : {} });
});

module.exports = app;
