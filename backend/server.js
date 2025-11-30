const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// ==== Middleware ====
app.use(cors({
    origin: 'https://server-javascript-2.onrender.com'
}));
app.use(express.json());

// ===== In-memory database =====
let items = [];
let id = 1;

// ===== CRUD API =====

// Create item
app.post('/api/items', (req, res) => {
    const newItem = { id: id++, ...req.body };
    items.push(newItem);
    res.status(201).json(newItem);
});

// Get all items
app.get('/api/items', (req, res) => {
    res.json(items);
});

// Get one item
app.get('/api/items/:id', (req, res) => {
    const item = items.find(i => i.id == req.params.id);
    if (!item) {
        return res.status(404).json({ message: 'Not found' });
    }
    res.json(item);
});

// Update item
app.put('/api/items/:id', (req, res) => {
    const index = items.findIndex(i => i.id == req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: 'Not found' });
    }

    items[index] = { id: Number(req.params.id), ...req.body };
    res.json(items[index]);
});

// Delete item
app.delete('/api/items/:id', (req, res) => {
    const index = items.findIndex(i => i.id == req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: 'Not found' });
    }

    const deleted = items.splice(index, 1);
    res.json(deleted[0]);
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});