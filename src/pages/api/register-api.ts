// pages/api/register.ts
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../database';
import bcrypt from 'bcrypt';

type Data = {
  message: string;
};

type User = {
  username: string;
  password: string;
  email: string;
  phone: string;
  role?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { username, password, email, phone, role = 'user' }: User = req.body;

  if (!username || !password || !email || !phone) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('api-1')
    const query = `INSERT INTO users (username, password, email, phone, role) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [username, hashedPassword, email, phone, role], function (err) {
      console.log('api-2')
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ message: 'Username or email already exists' });
        }
        return res.status(500).json({ message: 'Database error' });
      }

      return res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}