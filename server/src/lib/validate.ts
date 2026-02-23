import joi from "joi";
import { SignUpType } from "../types/Registration";

function registerValidation(data: SignUpType) {
  const registerSchema = joi.object({
    name: joi.string().required(),
    username: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
  });
  return registerSchema.validate(data);
}

interface LoginValidation {
  email: string;
  password: string;
}
function loginValidation(data: LoginValidation) {
  const loginSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
  });
  return loginSchema.validate(data);
}

export { registerValidation, loginValidation };
