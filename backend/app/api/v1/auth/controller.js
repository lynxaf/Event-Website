const { signin, signup } = require('../../../services/mongoose/auth');
const { StatusCodes } = require('http-status-codes');

/**
 * Controller untuk pendaftaran user baru (CMS)
 */
const signupCms = async (req, res, next) => {
  try {
    const result = await signup(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Controller untuk login user (CMS)
 */
const signinCms = async (req, res, next) => {
  try {
    const result = await signin(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { signupCms, signinCms };