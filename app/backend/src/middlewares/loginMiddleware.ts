import { NextFunction, Request, Response } from 'express';

import * as Joi from 'joi';

// Validação:

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
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  next();
};

export default { validateLogin };
