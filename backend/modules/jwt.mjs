import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config.mjs';

const verifyJwt = (token, secretKey) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  };

function generateCookieToken(user){
    const token = jwt.sign(user, SECRET_KEY);
    return token;
}


async function decodeCookieToken(token){
    try{
        const user = await verifyJwt(token, SECRET_KEY);
        return user;
    }catch(err){
        console.log(err);
    }
}

export{
    generateCookieToken,
    decodeCookieToken
}