import { NextFunction, Request, Response } from 'express';

import * as Joi from 'joi';

const loginDTO = (input: object) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).messages({
    'any.required': '{{#label}} is required',
  });
  return schema.validate(input, { abortEarly: false });
};

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const isValid = loginDTO(req.body);
  const message = isValid.error?.message;
  if (message) {
    const status = (message.includes('is required')
      ? 400 : 422);
    return res.status(status).json({ message });
  }
  next();
};

export default { validateLogin };
