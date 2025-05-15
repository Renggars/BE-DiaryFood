const jwt = require("jsonwebtoken");
const moment = require("moment");
const config = require("../config/config");
const { tokenTypes } = require("../config/tokens");
const prisma = require("../../prisma/index");

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {object} decoded payload
 */
const verifyToken = async (token, type) => {
  try {
    const payload = jwt.verify(token, config.jwt.secret);

    if (payload.type !== type) {
      throw new Error("Invalid token type");
    }

    return payload;
  } catch (error) {
    throw new Error("Token verification failed");
  }
};

/**
 * Generate auth tokens (access + refresh) tanpa simpan di DB
 * @param {User} user
 * @returns {Object}
 */
const generateAuthTokens = (user) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "minutes" // pastikan ini "minutes" sesuai nama config
  );
  const accessToken = generateToken(
    user.id,
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    "days"
  );
  const refreshToken = generateToken(
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

module.exports = {
  generateToken,
  verifyToken,
  generateAuthTokens,
};
