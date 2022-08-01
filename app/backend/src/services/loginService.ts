import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import validateToken from '../utils/validateToken';
import User from '../database/models/user';

class LoginService {
  public authLogin = async (email: string, password: string) => {
    let payload = {};
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return (
        {
          message: 'Incorrect email or password',
        }
      );
    }

    const passwordIsValid = compareSync(password, user.getDataValue('password'));

    if (!passwordIsValid) return { message: 'Incorrect email or password' };

    payload = { email: user.getDataValue('email'), password: user.getDataValue('password') };

    const token = sign(payload, process.env.JWT_TOKEN || 'jwt_secret');
    return token;
  };

  validateLogin = async (token: string, email: string) => {
    const tokenIsValid = validateToken(token);

    if (!tokenIsValid) return { message: 'Invalid token' };

    const user = await User.findOne({
      where: { email },
    });

    const role = user?.getDataValue('role');

    return role;
  };
}

export default LoginService;
