import { Request, Response } from 'express';
import LoginService from '../services/loginService';

class LoginController {
  loginService: LoginService;
  actualUserEmail: string;

  constructor() {
    this.loginService = new LoginService();
  }

  authLogin = async (req: Request, res: Response): Promise<Response | undefined> => {
    const response = await this.loginService.authLogin(req.body.email, req.body.password);
    this.actualUserEmail = req.body.email;
    if (!response) return res.status(500);
    if (typeof response === 'object') return res.status(401).json({ message: response.message });
    res.status(200).json({ token: response });
  };

  loginValidate = async (req: Request, res: Response): Promise<Response | undefined> => {
    const token = req.headers.authorization;

    if (!token || typeof token !== 'string') {
      return res.status(401).json({ message: 'invalid token' });
    }

    const response = this.loginService.validateLogin(token, this.actualUserEmail);

    return res.status(200).json({ role: response });
  };
}

export default LoginController;
