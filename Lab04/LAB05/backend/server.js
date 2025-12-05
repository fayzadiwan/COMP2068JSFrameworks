const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const itemsRoutes = require('./routes/items');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/items', itemsRoutes);

app.get('/', (req, res) => res.send('LAB05 Backend running'));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));