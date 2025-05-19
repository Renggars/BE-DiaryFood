const Joi = require("joi");
const { objectId } = require("./custom.validation");

const updateLangkah = {
  params: Joi.object().keys({
    langkahId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      urutan: Joi.number().integer().optional(),
      deskripsi: Joi.string().optional(),
    })
    .min(1),
};

const deleteLangkah = {
  params: Joi.object().keys({
    langkahId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = { updateLangkah, deleteLangkah };
