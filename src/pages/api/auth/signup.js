import { getDatabase } from '@/models';
import User from '@/models/user';
import bcrypt from 'bcryptjs';


export default async (req, res) => {
  try {
    console.log('Received signup request:', req.body);
    console.log('Type of req.body:', typeof req.body);
    const { username, mobileNumber, password, confirmPassword } = req.body;
    
    const existingUser = await User.findOne({ mobileNumber });
    if (existingUser) {
      console.log('user exisits')
      return res.status(404).json({ error: 'User already exists' });
    }

    if (password !== confirmPassword) {
      console.log('password')
      return res.status(404).json({ error: 'Passwords do not match' });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!password.match(passwordRegex)) {
      console.log('reges matching')
      return res.status(400).json({
        error:
          'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter,  digit, and special character',
      });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      mobileNumber,
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
