import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.get('/profile', protect, getUserProfile);


// Public routes
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


export default router;