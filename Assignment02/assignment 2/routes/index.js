const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

/* GET home page — public listing with search */
router.get('/', async function(req, res, next) {
  try {
    const q = req.query.q ? req.query.q.trim() : '';
    const filter = {};
    if (q) {
      // simple keyword search on title and description
      filter.$or = [
        { title: new RegExp(q, 'i') },
        { description: new RegExp(q, 'i') }
      ];
    }

    const items = await Item.find(filter).sort({ createdAt: -1 }).limit(100).lean();
    res.render('index', { title: 'MyDirectory', items, q });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
