import prisma from '../utils/db.js';
import { generateTryOn } from '../utils/aiService.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import { CREDIT_COSTS } from '../config/constants.js';

export const generateTryOnImage = async (req, res, next) => {
  try {
    const { personImageId, outfitImageId } = req.body;

    if (!personImageId || !outfitImageId) {
      return res.status(400).json({ 
        message: 'Both personImageId and outfitImageId are required' 
      });
    }

    // Check user credits
    const user = await prisma.user.findUnique({
      where: { id: req.userId }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.credits < CREDIT_COSTS.TRY_ON) {
      return res.status(402).json({ 
        message: 'Insufficient credits. Please purchase more credits.',
        credits: user.credits,
        required: CREDIT_COSTS.TRY_ON
      });
    }

    // Fetch images
    const [personImage, outfitImage] = await Promise.all([
      prisma.image.findUnique({ where: { id: personImageId } }),
      prisma.image.findUnique({ where: { id: outfitImageId } })
    ]);

    if (!personImage || !outfitImage) {
      return res.status(404).json({ message: 'One or both images not found' });
    }

    // Verify ownership
    if (personImage.userId !== req.userId || outfitImage.userId !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to use these images' });
    }

    // Validate image types
    if (personImage.type !== 'user') {
      return res.status(400).json({ message: 'First image must be a user/person photo' });
    }

    if (outfitImage.type !== 'outfit') {
      return res.status(400).json({ message: 'Second image must be an outfit' });
    }

    // Generate try-on
    let resultImageUrl;
    try {
      resultImageUrl = await generateTryOn(personImage.url, outfitImage.url);
    } catch (aiError) {
      console.error('AI generation failed:', aiError);
      return res.status(500).json({ 
        message: 'AI generation failed. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? aiError.message : undefined
      });
    }

    // Upload result to Cloudinary (if not already a URL)
    let finalUrl = resultImageUrl;
    let cloudinaryId = null;
    
    if (!resultImageUrl.startsWith('http') && !resultImageUrl.startsWith('data:')) {
      // If result is a buffer, upload it
      const uploadResult = await uploadToCloudinary(resultImageUrl, 'generated');
      finalUrl = uploadResult.secure_url;
      cloudinaryId = uploadResult.public_id;
    }

    // Deduct credits
    await prisma.user.update({
      where: { id: req.userId },
      data: { credits: { decrement: CREDIT_COSTS.TRY_ON } }
    });

    // Save generated image
    const generatedImage = await prisma.image.create({
      data: {
        userId: req.userId,
        type: 'generated',
        url: finalUrl,
        cloudinaryId,
        metadata: {
          personImageId,
          outfitImageId,
          generatedAt: new Date().toISOString()
        }
      }
    });

    // Get updated user credits
    const updatedUser = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { credits: true }
    });

    res.json({
      message: 'Try-on generated successfully',
      image: {
        id: generatedImage.id,
        url: generatedImage.url,
        createdAt: generatedImage.createdAt
      },
      creditsRemaining: updatedUser.credits
    });
  } catch (error) {
    next(error);
  }
};

    res.json({
      message: 'Try-on generated successfully',
      image: {
        id: generatedImage.id,
        url: generatedImage.url,
        createdAt: generatedImage.createdAt
      },
      creditsRemaining: updatedUser.credits
    });
  } catch (error) {
    next(error);
  }
};

