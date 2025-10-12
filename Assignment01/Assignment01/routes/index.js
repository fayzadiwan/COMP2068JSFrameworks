const express = require('express');
const router = express.Router();

// Home page
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Home', year: new Date().getFullYear() });
});

// About page
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Me', year: new Date().getFullYear() });
});

// Projects page
router.get('/projects', function(req, res, next) {
  // sample projects array
  const projects = [
    { name: 'Project A', description: 'A sample project.', link: '#' },
    { name: 'Project B', description: 'Another sample project.', link: '#' }
  ];
  res.render('projects', { title: 'Projects', projects, year: new Date().getFullYear() });
});

// Contact page (GET)
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Me', year: new Date().getFullYear() });
});

// Contact form POST (simple simulation)
router.post('/contact', function(req, res, next) {
  const { name, email, message } = req.body;
  // In a real site you'd validate and send an email. For this assignment we just render a thank you.
  res.render('contact-success', { title: 'Contact Me', name, year: new Date().getFullYear() });
});

module.exports = router;
