// File: api/wish.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, ObjectId } from 'mongodb';

let cachedDb: any = null;

async function connectToDatabase(uri: string) {
    try {
      if (cachedDb) {
        return cachedDb;
      }
      const client = await MongoClient.connect(uri);
      const db = client.db('birthday_app_db');
      cachedDb = db;
      return db;
    } catch (error) {
      console.error('Database connection error:', error);
      throw error;
    }
  }  

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'https://bdayapp.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const db = await connectToDatabase(process.env.MONGODB_URI as string);

  if (req.method === 'POST') {
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
        createdAt: new Date(),
      });
      res.status(201).json({ success: true, id: result.insertedId });
    } catch (error) {
      console.error('Error saving wish:', error);
      res.status(500).json({ success: false, message: 'Failed to save wish.' });
    }
  } else if (req.method === 'GET') {
    const { id } = req.query;

    if (!id) {
      res.status(400).json({ success: false, message: 'Wish ID is required.' });
      return;
    }

    try {
      const wish = await db.collection('wishes').findOne({ _id: new ObjectId(id as string) });
      if (wish) {
        res.status(200).json(wish);
      } else {
        res.status(404).json({ message: 'Wish not found' });
      }
    } catch (error) {
      console.error('Error fetching wish:', error);
      res.status(500).json({ success: false, message: 'Error fetching wish.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}