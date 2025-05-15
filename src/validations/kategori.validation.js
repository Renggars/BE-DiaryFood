const Joi = require("joi");

const createKategori = {
  body: Joi.object().keys({
    nama: Joi.string().required(),
  }),
};

const updateKategori = {
  params: Joi.object().keys({
    kategoriId: Joi.number().integer().required(),
  }),
  body: Joi.object()
    .keys({
      nama: Joi.string().required(),
    })
    .min(1),
};

const deleteKategori = {
  params: Joi.object().keys({
    kategoriId: Joi.number().integer().required(),
  }),
};

const getKategori = {
  params: Joi.object().keys({
    kategoriId: Joi.number().integer().required(),
  }),
};

module.exports = {
  createKategori,
  updateKategori,
  deleteKategori,
  getKategori,
};
