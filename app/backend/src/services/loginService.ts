import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../database/models/user';

class LoginService {
  public authLogin = async (email: string, password: string) => {
    let payload = {};
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return (
        { message: 'Usuário não encontrado' }
      );
    }

    const passwordIsValid = compareSync(password, user.getDataValue('password'));

    if (!passwordIsValid) return { message: 'Senha incorreta' };

    payload = { email: user.getDataValue('email'), password: user.getDataValue('password') };

    const token = sign(payload, process.env.JWT_TOKEN || 'jwt_secret');
    return token;
  };
}

export default LoginService;
