import { User } from '../models/index.js';
import { sequelize } from '../config/database.js';
// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//get user profile 
export const getUserProfile = async (req, res) => {
  try {
    // The user ID should be attached to req by the auth middleware
    const userId = req.user.id;
    
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found - 1st' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new user
export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide username, email and password' });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ 
      where: { 
        [sequelize.Op.or]: [{ email }, { username }] 
      } 
    });
    
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or username already exists' });
    }
    
    // Create user
    const newUser = await User.create({
      username,
      email,
      password // In a real app, hash this password before storing
    });
    
    // Don't send password back
    const { password: _, ...userResponse } = newUser.toJSON();
    
    res.status(201).json(userResponse);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found - 2nd' });
    }
    
    // Update user fields
    await user.update(req.body);
    
    // Don't send password back
    const { password: _, ...userResponse } = user.toJSON();
    
    res.status(200).json(userResponse);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found -3rd' });
    }
    
    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};