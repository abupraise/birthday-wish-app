import express, { Request, Response } from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
}));

let db: any;

MongoClient.connect(process.env.MONGODB_URI as string)
  .then((client) => {
    db = client.db('birthday_app_db');
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => console.error('Failed to connect to MongoDB Atlas', error));

app.post('/wish', async (req: Request, res: Response) => {
  const { celebrantName, celebrantAge, senderName, message } = req.body;

  if (!celebrantName || !celebrantAge || !senderName || !message) {
    res.status(400).json({ success: false, message: 'All fields are required.' });
    return;
  }

  try {
    const result = await db.collection('wishes').insertOne({
      celebrantName,
      celebrantAge,
      senderName,
      message,
    });
    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to save wish.' });
  }
});

app.get('/wish/:id', async (req: Request, res: Response) => {
  try {
    const wish = await db.collection('wishes').findOne({ _id: new ObjectId(req.params.id) });
    if (wish) {
      res.status(200).json(wish);
    } else {
      res.status(404).json({ message: 'Wish not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching wish.' });
  }
});

export default app;