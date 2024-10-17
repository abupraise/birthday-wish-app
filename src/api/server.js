import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
const wishes = {};
app.post('/api/wishes', (req, res) => {
    const id = uuidv4();
    wishes[id] = req.body;
    res.json({ id });
});
app.get('/api/wishes/:id', (req, res) => {
    const wish = wishes[req.params.id];
    if (wish) {
        res.json(wish);
    }
    else {
        res.status(404).json({ error: 'Wish not found' });
    }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
