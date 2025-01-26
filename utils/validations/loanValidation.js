import Joi from "joi";

export const validateLoan = (data) => {
  const schema = Joi.object({
    category: Joi.string().required(),
    subcategory: Joi.string().required(),
    requestedAmount: Joi.number().min(1).required(),
    loanPeriod: Joi.number().valid(3, 4, 5).required(),
  });
  return schema.validate(data);
};
