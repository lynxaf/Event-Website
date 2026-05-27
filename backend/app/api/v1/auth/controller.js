const { signin, signup } = require('../../../services/mongoose/auth');
const { StatusCodes } = require('http-status-codes');

/**
 * Controller untuk pendaftaran user baru (CMS)
 */
const signupCms = async (req, res, next) => {
  try {
    console.log('Signup request body:', req.body); // Log untuk debugging

    const result = await signup(req);

    console.log('Signup result:', result); // Log hasil dari service

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    console.error('Signup error:', err.message); // Log error untuk debugging
    next(err);
  }
};

/**
 * Controller untuk login user (CMS)
 */
const signinCms = async (req, res, next) => {
  try {
    console.log('Signin request body:', req.body); // Log untuk debugging

    const result = await signin(req);

    console.log('Signin result:', result); // Log hasil dari service

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    console.error('Signin error:', err.message); // Log error untuk debugging
    next(err);
  }
};

module.exports = { signupCms, signinCms };