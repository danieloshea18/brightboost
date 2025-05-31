// api/login/index.js

import prisma from '../../../prisma/client.cjs';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const validated = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare password (assume hashed, use bcrypt)
    const bcrypt = await import('bcryptjs');
    const valid = await bcrypt.compare(validated.password, user.password);

    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // TODO: generate and return JWT/session as appropriate

    // Never include sensitive data in error or success responses
    const { password, ...userSafe } = user;
    res.status(200).json({ user: userSafe });
  } catch (error) {
    // Only generic error message to avoid leaking details
    res.status(500).json({ error: 'Internal server error' });
  }
}
