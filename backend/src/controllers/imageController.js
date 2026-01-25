import prisma from '../utils/db.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/cloudinary.js';

export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const { type } = req.body; // "user" or "outfit"
    
    if (!type || !['user', 'outfit'].includes(type)) {
      return res.status(400).json({ message: 'Invalid image type. Must be: user or outfit' });
    }

    // Validate file size
    if (req.file.size > 5 * 1024 * 1024) {
      return res.status(400).json({ message: 'File size exceeds 5MB limit' });
    }

    // Upload to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer, type);

    // Save to database
    const image = await prisma.image.create({
      data: {
        userId: req.userId,
        type,
        url: result.secure_url,
        cloudinaryId: result.public_id
      }
    });

    res.status(201).json({
      message: 'Image uploaded successfully',
      image: {
        id: image.id,
        url: image.url,
        type: image.type,
        createdAt: image.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getUserImages = async (req, res, next) => {
  try {
    const { type } = req.query;

    const where = {
      userId: req.userId
    };

    if (type && ['user', 'outfit', 'generated'].includes(type)) {
      where.type = type;
    }

    const images = await prisma.image.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    res.json({ images });
  } catch (error) {
    next(error);
  }
};

export const deleteImage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const image = await prisma.image.findUnique({
      where: { id }
    });

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    if (image.userId !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this image' });
    }

    // Delete from Cloudinary
    if (image.cloudinaryId) {
      await deleteFromCloudinary(image.cloudinaryId);
    }

    // Delete from database
    await prisma.image.delete({
      where: { id }
    });

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const saveGeneratedImage = async (req, res, next) => {
  try {
    const { url, cloudinaryId, metadata } = req.body;

    if (!url) {
      return res.status(400).json({ message: 'Image URL is required' });
    }

    const image = await prisma.image.create({
      data: {
        userId: req.userId,
        type: 'generated',
        url,
        cloudinaryId: cloudinaryId || null,
        metadata: metadata || null
      }
    });

    res.status(201).json({
      message: 'Image saved successfully',
      image
    });
  } catch (error) {
    next(error);
  }
};

