import { verify } from 'jsonwebtoken';

const validateToken = (token: string) => {
  try {
    const tokenIsValid = verify(token, process.env.JWT_TOKEN || 'jwt_secret');
    if (tokenIsValid) return true;
  } catch (err) {
    return false;
  }
};

export default validateToken;
