const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  req.flash('error', 'Please log in to access this page.');
  res.redirect('/auth/login');
}

// multer setup
const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, uploadDir); },
  filename: function (req, file, cb) { cb(null, Date.now() + '-' + file.originalname); }
});
const upload = multer({ storage });

/* GET items index (private) */
router.get('/', ensureAuthenticated, async (req, res, next) => {
  try {
    const items = await Item.find({ createdBy: req.user._id }).sort({ createdAt: -1 }).lean();
    res.render('items/index', { items });
  } catch (err) { next(err); }
});

/* GET add */
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('items/add');
});

/* POST add */
router.post('/', ensureAuthenticated, upload.single('image'), async (req, res, next) => {
  try {
    const { title, description, category } = req.body;
    const item = new Item({
      title,
      description,
      category,
      createdBy: req.user._id,
      imagePath: req.file ? `/uploads/${req.file.filename}` : null
    });
    await item.save();
    req.flash('success', 'Item created.');
    res.redirect('/items');
  } catch (err) { next(err); }
});

/* GET edit */
router.get('/:id/edit', ensureAuthenticated, async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id).lean();
    if (!item) { req.flash('error', 'Item not found'); return res.redirect('/items'); }
    if (!item.createdBy.equals(req.user._id)) { req.flash('error', 'Not authorized'); return res.redirect('/items'); }
    res.render('items/edit', { item });
  } catch (err) { next(err); }
});

/* PUT edit */
router.put('/:id', ensureAuthenticated, upload.single('image'), async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) { req.flash('error', 'Item not found'); return res.redirect('/items'); }
    if (!item.createdBy.equals(req.user._id)) { req.flash('error', 'Not authorized'); return res.redirect('/items'); }
    item.title = req.body.title;
    item.description = req.body.description;
    item.category = req.body.category;
    if (req.file) {
      // remove old image file if exists
      if (item.imagePath) {
        const old = path.join(__dirname, '..', 'public', item.imagePath);
        if (fs.existsSync(old)) fs.unlinkSync(old);
      }
      item.imagePath = `/uploads/${req.file.filename}`;
    }
    await item.save();
    req.flash('success', 'Item updated.');
    res.redirect('/items');
  } catch (err) { next(err); }
});

/* DELETE */
router.delete('/:id', ensureAuthenticated, async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) { req.flash('error', 'Item not found'); return res.redirect('/items'); }
    if (!item.createdBy.equals(req.user._id)) { req.flash('error', 'Not authorized'); return res.redirect('/items'); }
    // remove image file
    if (item.imagePath) {
      const file = path.join(__dirname, '..', 'public', item.imagePath);
      if (fs.existsSync(file)) fs.unlinkSync(file);
    }
    await item.remove();
    req.flash('success', 'Item deleted.');
    res.redirect('/items');
  } catch (err) { next(err); }
});

module.exports = router;
