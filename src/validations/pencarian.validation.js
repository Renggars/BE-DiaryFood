const Joi = require("joi");

const createPencarian = {
  body: Joi.object().keys({
    userId: Joi.number().required(),
    kataKunci: Joi.string().required(),
    hasilResepIds: Joi.array().items(Joi.number()).min(1).required(),
  }),
};

const getPencarian = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

const deletePencarian = getPencarian;

const querySchema = Joi.object().keys({
  userId: Joi.number().required(),
  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).default(10),
});

module.exports = {
  createPencarian,
  getPencarian,
  deletePencarian,
  querySchema,
};
