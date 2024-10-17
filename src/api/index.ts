import express, { Request, Response } from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

let db: any;

// MongoDB connection
MongoClient.connect(process.env.MONGODB_URI as string)
  .then((client) => {
    db = client.db('birthday_app_db');
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => console.error('Failed to connect to MongoDB Atlas', error));

// API route to save birthday wishes
app.post('/wish', async (req: Request, res: Response) => {
  const { celebrantName, celebrantAge, senderName, message } = req.body;
  try {
    const result = await db.collection('wishes').insertOne({ celebrantName, celebrantAge, senderName, message });
    res.status(201).json({ success: true, message: 'Wish saved!', id: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to save wish' });
  }
});

// API route to retrieve a wish by ID
app.get('/wish/:id', async (req: Request, res: Response) => {
  try {
    const wish = await db.collection('wishes').findOne({ _id: new ObjectId(req.params.id) });
    if (wish) {
      res.status(200).json(wish);
    } else {
      res.status(404).json({ message: 'Wish not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching wish' });
  }
});

export default app;
