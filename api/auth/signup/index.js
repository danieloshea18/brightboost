// api/auth/signup/index.js

import prisma from '../../../prisma/client.cjs'; // Adjust import if needed
import { z } from 'zod';

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['student', 'teacher', 'admin']), // Use only valid roles
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const validated = signupSchema.parse(req.body);

    // Check for duplicate email
    const existing = await prisma.user.findUnique({
      where: { email: validated.email },
    });
    if (existing) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    // Hash password (use bcrypt or argon2, here’s bcrypt as an example)
    const bcrypt = await import('bcryptjs');
    const hashedPassword = await bcrypt.hash(validated.password, 10);

    const user = await prisma.user.create({
      data: {
        email: validated.email,
        password: hashedPassword,
        role: validated.role,
      },
    });

    // Do NOT include password in response!
    const { password, ...userSafe } = user;
    res.status(201).json({ user: userSafe });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input', details: error.errors });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}
