import { Request, Response } from 'express';
import LoginService from '../services/loginService';

class LoginController {
  loginService: LoginService;
  constructor() {
    this.loginService = new LoginService();
  }

  authLogin = async (req: Request, __res: Response): Promise<string> => {
    const token = await this.loginService.authLogin(req.body.email, req.body.password);
    return token;
  };
}

export default LoginController;
