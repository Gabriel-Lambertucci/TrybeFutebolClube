import { Request, Response } from 'express';
import LoginService from '../services/loginService';

class LoginController {
  loginService: LoginService;
  constructor() {
    this.loginService = new LoginService();
  }

  authLogin = async (req: Request, res: Response): Promise<Response | undefined> => {
    const response = await this.loginService.authLogin(req.body.email, req.body.password);
    console.log(response);
    if (!response) return res.status(500);
    if (typeof response === 'object') return res.status(401).json({ message: response.message });
    res.status(200).json({ token: response });
  };
}

export default LoginController;
