import { Request, Response } from 'express';
import LoginService from '../services/loginService';

class LoginController {
  loginService: LoginService;
  constructor() {
    this.loginService = new LoginService();
  }

  authLogin = async (req: Request, res: Response): Promise<Response | undefined> => {
    const token = await this.loginService.authLogin(req.body.email, req.body.password);
    if (!token || typeof token === 'object') return res.status(500).json(token);
    res.status(200).json({ token });
  };
}

export default LoginController;
