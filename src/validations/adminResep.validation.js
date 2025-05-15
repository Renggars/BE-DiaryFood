const Joi = require("joi");

const resepId = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

const querySchema = Joi.object().keys({
  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).default(10),
});

module.exports = {
  resepId,
  querySchema,
};
