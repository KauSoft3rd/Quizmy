import { verify } from 'jsonwebtoken';
import { response } from "../../src/config/response.js";
import { status } from "../../src/config/response.status.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.send(response(status.BAD_REQUEST));
  }

  try {
    const cleanedToken = token.includes('Bearer ') ? token.split(' ')[1] : token;
    const decoded = verify(cleanedToken, process.env.TOKEN_SECRET);
    req.user = decoded;
    next()
;  } catch (error) {
    console.log(error);
    return res.send(response(status.TOKEN_TIMEOUT));
  }
};
