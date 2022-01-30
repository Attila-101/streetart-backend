const Streetart=require('../models/Streetart')

async function getArt(req, res, next) {
    let art;
    try {
      art = await Streetart.findById(req.params.id);
      if (art == null) {
        return res
          .status(404)
          .json({
            message: `Unfortunately we cannot find what You're looking for. Try again with different id`,
          });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.art = art;
    next();
  }

  module.exports = getArt
  