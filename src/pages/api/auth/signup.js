import { getDatabase } from '@/models';
import User from '@/models/user';
import bcrypt from 'bcryptjs';

export default async (req, res) => {
  try {
    await getDatabase();

    const { email, password } = JSON.parse(req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(403).json({ error: 'User already exists' });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!password.match(passwordRegex)) {
      return res.status(400).json({
        error:
          'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, digit, and special character',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    console.log('User saved successfully');
    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Failed to sign up' });
  }
};
