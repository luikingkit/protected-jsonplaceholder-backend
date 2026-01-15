const {
  signNonAdminRefreshTokens,
  signNonAdminAccessToken,
  AUTH_ERRORS,
} = require('@luikingkit/auth-simplified');
const ROLES = require('./roles');

const loginMember = async (req, res) => {
  const { username, password } = req.body || {};

  // hard code for demo
  if (username === 'john' && password === '123456') {
    const userId = '64f2e5c62a3b0b3e5fc8d6a2';
    const role = ROLES.MEMBER;

    const signed = await signNonAdminRefreshTokens(userId, role);
    if (signed) {
      return res.json(signed);
    }
  }

  res.status(401).json({
    message: AUTH_ERRORS.AUTHENTICATION_FAILED,
  });
};

const authGuest = async (req, res) => {
  const { apiKey } = req.body || {};

  // hard code for demo
  if (apiKey === 'app-api-key-123') {
    const role = ROLES.GUEST;
    const signed = await signNonAdminAccessToken(role);
    if (signed) {
      return res.json(signed);
    }
  }

  res.status(401).json({
    message: AUTH_ERRORS.AUTHENTICATION_FAILED,
  });
};

module.exports = {
  loginMember,
  authGuest,
};
