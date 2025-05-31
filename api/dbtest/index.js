// dbtest/index.js

import prisma from '../../prisma/client.cjs'; // Adjust path

export default async function handler(req, res) {
  try {
    // Example: Fetch all users using Prisma (not raw SQL)
    const users = await prisma.user.findMany();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Database test failed.' });
  }
}
