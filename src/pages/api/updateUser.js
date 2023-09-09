import { withIronSessionApiRoute } from 'iron-session/next';

import { sessionOptions } from '@/lib/session';
import { getDatabase } from '@/models';
import User from '@/models/user';

const profileUpdateRouter = async (req, res) => {
  try {
    await getDatabase();
    
    const { user } = req.session;

    if (!user) {
      console.error('User not authenticated');
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { name, email, id } = req.body;

    if (user.id !== id) {
      console.error('User ID mismatch');
      return res.status(403).json({ error: 'User ID mismatch' });
    }

    console.log("Session:", req.session); 
    console.log("User:", user); 

    const updatedUser = await User.findById(user.id); 

    if (!updatedUser) {
      console.error('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    console.log("User ID:", user.id, { name, email });
    console.log("Request payload:", { name, email });

    updatedUser.name = name;
    updatedUser.email = email;
    await updatedUser.save();

    console.log("Updated user data:", updatedUser);
    console.log("Sending updated user data in response:", updatedUser);

    user.name = name;
    user.email = email;
    req.session.user = user;
    await req.session.save();

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

export default withIronSessionApiRoute(profileUpdateRouter, sessionOptions);
