const Joi = require("joi");
const { objectId } = require("./custom.validation");

const updateBahan = {
  params: Joi.object().keys({
    bahanId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      nama: Joi.string(),
      jumlah: Joi.string(),
    })
    .min(1),
};

const deleteBahan = {
  params: Joi.object().keys({
    bahanId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = { updateBahan, deleteBahan };
