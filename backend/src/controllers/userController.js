import prisma from '../utils/db.js';
import bcrypt from 'bcryptjs';

export const getProfile = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        email: true,
        name: true,
        credits: true,
        subscription: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, email, password, currentPassword } = req.body;
    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (email !== undefined) {
      // Check if email is already taken
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing && existing.id !== req.userId) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      updateData.email = email;
    }
    if (password !== undefined) {
      if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
      }
      
      // If currentPassword is provided, verify it before changing password
      if (currentPassword !== undefined) {
        const user = await prisma.user.findUnique({
          where: { id: req.userId },
          select: { passwordHash: true }
        });
        
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        
        const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!isValid) {
          return res.status(401).json({ message: 'Current password is incorrect' });
        }
      }
      
      updateData.passwordHash = await bcrypt.hash(password, 10);
    }

    const user = await prisma.user.update({
      where: { id: req.userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        credits: true,
        subscription: true
      }
    });

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    next(error);
  }
};

export const deleteAccount = async (req, res, next) => {
  try {
    // Delete all user images from Cloudinary and database
    const images = await prisma.image.findMany({
      where: { userId: req.userId }
    });

    // Note: In production, you'd want to delete from Cloudinary as well
    // This is handled by Prisma's onDelete: Cascade

    // Delete user (cascades to images and transactions)
    await prisma.user.delete({
      where: { id: req.userId }
    });

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    next(error);
  }
};

