import { getDatabase } from '@/models';
import User from '@/models/user';
import bcrypt from 'bcryptjs';

export default async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(404).json({ error: 'User already exists' });
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

    await getDatabase();
    await newUser.save();

    console.log('User saved successfully');
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Failed to sign up' });
  }
};
