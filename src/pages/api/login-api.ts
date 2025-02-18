// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../database';
import bcrypt from 'bcrypt';

type Data = {
  message: string;
  token?: string;
};

type LoginRequest = {
  username: string;
  password: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { username, password }: LoginRequest = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const query = `SELECT * FROM users WHERE username = ?`;
    db.get(query, [username], async (err, row: any) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }

      if (!row) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const isPasswordValid = await bcrypt.compare(password, row.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      const token = generateToken(row.id, row.role);

      return res.status(200).json({ message: 'Login successful', token });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

function generateToken(userId: number, role: string): string {
  return `fake-token-for-user-${userId}-with-role-${role}`;
}