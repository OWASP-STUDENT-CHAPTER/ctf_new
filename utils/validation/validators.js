// const Joi = require("joi");

// exports.register = (body) => {
//     const schema = Joi.object({
//         name: Joi.string().trim().required().max(150),
//         year: Joi.string()
//             .valid("school", "first", "second", "third", "fourth")
//             .required()
//             .trim(),
//         phoneNo: Joi.string().length(10).trim().required(),
//         rollNo: Joi.string().trim().required(),
//         college: Joi.string().trim().required(),
//         _csrf: Joi.any(),
//     });

//     return schema.validate(body);
// };

// exports.createTeam = (body) => {
//     const schema = Joi.object({
//         teamName: Joi.string().max(20).required().trim(),
//     });

//     return schema.validate(body);
// };

// exports.joinTeam = (body) => {
//     const schema = Joi.object({
//         inviteCode: Joi.string().max(20).required().trim(),
//     });

//     return schema.validate(body);
// };