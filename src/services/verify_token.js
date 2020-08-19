import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.CLIENT_ID);

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    client.getTokenInfo(
      token,
    ).then((info) => {
      if (info.aud === process.env.CLIENT_ID)resolve(info);
      else reject(info);
    }).catch((e) => { reject(e); });
  });
};
export default verifyToken;
