import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config({ silent: true });
const client = new OAuth2Client(process.env.CLIENT_ID);

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    client.getTokenInfo(
      token,
    ).then((info) => {
      if (info.aud === process.env.CLIENT_ID) {
        resolve(info);
        // eslint-disable-next-line prefer-promise-reject-errors
      } else reject({ message: 'mismatch client ID' });
    }).catch((e) => { reject(e); });
  });
};
export default verifyToken;
