
const Joi = require("joi");

const hintCreateValidator = (body) => {
  const schema = Joi.object({
    questionId: Joi.text().required(),
    cost: Joi.Number().required(),
    text: Joi.string().required(),
  });
  return schema.validate(body);
};


module.exports = {
  hintCreateValidator,
};
