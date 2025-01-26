import Joi from "joi";

export const validateRegister = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    cnic: Joi.string().length(13).pattern(/^\d+$/).required(),
  });
  return schema.validate(data);
};
