const express = require('express');
const router = express.Router();

let items = [
  { id: 1, name: 'Item A', description: 'First item' },
  { id: 2, name: 'Item B', description: 'Second item' }
];
let nextId = 3;

router.get('/', (req, res) => res.json(items));

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).send({ error: 'Not found' });
  res.json(item);
});

router.post('/', (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).send({ error: 'Name required' });
  const newItem = { id: nextId++, name, description: description || '' };
  items.push(newItem);
  res.status(201).json(newItem);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description } = req.body;
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).send({ error: 'Not found' });
  items[idx] = { id, name: name || items[idx].name, description: description || items[idx].description };
  res.json(items[idx]);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).send({ error: 'Not found' });
  const deleted = items.splice(idx, 1);
  res.json(deleted[0]);
});

module.exports = router;