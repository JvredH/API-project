const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, Review, User, SpotImage, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

router.get('/', async (req, res, next) => {
  const allSpots = await Spot.findAll({
    include: [
      {
        model: Review,
        attributes: ['stars'],

      },
      {
        model: SpotImage,
        attributes: ['url', 'preview']
      }
    ]
  })

  // console.log(ratings)

  let allSpotsArray = []

  allSpots.forEach(spot => {
    allSpotsArray.push(spot.toJSON())
  })

  allSpotsArray.forEach(spot => {
    spot.SpotImages.forEach(image => {
      if (image.preview == true) {
        spot.previewImage = image.url
      }
    })
    if (!spot.previewImage) {
      spot.previewImage = 'No preview image available'
    }
    delete spot.SpotImages
  })

  allSpotsArray.forEach(spot => { // iterate through each spot object
    let reviewsArr = spot.Reviews;
    let arrLength = reviewsArr.length;
    let sum = 0;
    reviewsArr.forEach(star => {
      sum += star.stars
      spot.avgRating = sum / arrLength
    })
    delete spot.Reviews
  })

  res.json({Spots: allSpotsArray})
})

module.exports = router;
