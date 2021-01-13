const { OAuth2Client } = require('google-auth-library');
const env = require('dotenv');
env.config();

const { GOOGLE_CLIENT_ID } = process.env;

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const googleAuth = async (req) => {
  const token = req.headers.authorization;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return { payload };
  } catch (error) {
    throw new AuthenticationError('Authentication Error');
  }
};

module.exports = googleAuth;
