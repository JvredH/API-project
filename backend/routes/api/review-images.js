const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Review, ReviewImage, User, sequelize } = require('../../db/models');

const router = express.Router();

router.delete('/:imageId', requireAuth, async ( req, res, next ) => {
  const { imageId } = req.params;
  const user = req.user;

  const reviewImageToDelete = await ReviewImage.findByPk(imageId);

  if (!reviewImageToDelete) {
    res.status(404);
    return res.json({
      message: "Review couldn't be found",
      statusCode: res.statusCode
    })
  }

  const review = await Review.findByPk(reviewImageToDelete.reviewId);

  if (user.id == review.userId) {
    reviewImageToDelete.destroy()
    res.status(200);
    return res.json({
      message: 'Successfully deleted',
      statusCode: res.statusCode
    })
  } else {
    res.status(403);
    return res.json({
      message: 'Forbidden',
      statusCode: res.statusCode
    })
  }
})

module.exports = router;
