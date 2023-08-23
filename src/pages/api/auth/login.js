import { getDatabase } from '@/models';
import User from '@/models/user';
import bcrypt from 'bcryptjs';

export default async (req, res) => {
  try {

    await getDatabase();
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect username or password' });
    }


    res.status(200).json({ user });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Failed to log in' });
  }
};
