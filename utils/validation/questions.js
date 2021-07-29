const Joi = require("joi");

const questionCreateValidator = (body) => {
  const schema = Joi.object({
    questionNumber: Joi.number().required(),
    answer: Joi.string().required(),
    title: Joi.string().required(),
    body: Joi.string().required(),
    filesAssociated: Joi.string(),
    points: Joi.number().required(),
    roundNumber: Joi.number().required(),
  });
  return schema.validate(body);
};

const submitAnswerValidator = (body) => {
  const schema = Joi.object({
    answer: Joi.string().required(),
  });
  return schema.validate(body);
};
const hintCreateValidator = (body) => {
  const schema = Joi.object({
    roundNumber: Joi.number().required(),
    questionNumber: Joi.number().required(),
    cost: Joi.number().required(),
    text: Joi.string().required(),
  });
  return schema.validate(body);
};

module.exports = {
  questionCreateValidator,
  submitAnswerValidator,
  hintCreateValidator,
};
