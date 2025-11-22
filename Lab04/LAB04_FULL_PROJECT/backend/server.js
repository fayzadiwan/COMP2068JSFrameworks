const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const DATA_FILE = path.join(__dirname, 'data.json');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// load or init data
let items = [];
try {
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  items = JSON.parse(raw) || [];
} catch (e) {
  items = [
    { id: 1, title: 'Sample task', completed: false }
  ];
  fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2));
}

function save() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2));
}

// GET all
app.get('/api/items', (req, res) => {
  res.json(items);
});

// GET by id
app.get('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const it = items.find(i => i.id === id);
  if (!it) return res.status(404).json({ error: 'Not found' });
  res.json(it);
});

// POST create
app.post('/api/items', (req, res) => {
  const { title } = req.body;
  if (!title || !title.trim()) return res.status(400).json({ error: 'title required' });
  const id = items.length ? Math.max(...items.map(i => i.id)) + 1 : 1;
  const newItem = { id, title: title.trim(), completed: false };
  items.push(newItem);
  save();
  res.status(201).json(newItem);
});

// PUT update
app.put('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const it = items.find(i => i.id === id);
  if (!it) return res.status(404).json({ error: 'Not found' });
  const { title, completed } = req.body;
  if (title !== undefined) it.title = title;
  if (completed !== undefined) it.completed = Boolean(completed);
  save();
  res.json(it);
});

// DELETE
app.delete('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  const removed = items.splice(idx, 1)[0];
  save();
  res.json(removed);
});

app.listen(PORT, () => console.log(`Backend listening on http://localhost:${PORT}`));
