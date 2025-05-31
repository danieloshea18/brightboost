// debug/index.js

import prisma from '../../prisma/client.cjs'; // Adjust path

export default async function handler(req, res) {
  try {
    // Example debug: Count all lessons
    const lessonCount = await prisma.lesson.count();
    res.status(200).json({ lessonCount });
  } catch (error) {
    res.status(500).json({ error: 'Debug query failed.' });
  }
}
