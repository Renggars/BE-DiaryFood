import Joi from "joi";

const bahanSchema = Joi.object({
  nama: Joi.string().required(),
  jumlah: Joi.string().required(),
});

const langkahPembuatanSchema = Joi.object({
  urutan: Joi.number().integer().min(1).required(),
  deskripsi: Joi.string().required(),
});

const createResep = {
  body: Joi.object({
    nama: Joi.string().required(),
    photoResep: Joi.string().uri().optional().allow(null, ""),
    kategoriId: Joi.number().integer().required(),
    userId: Joi.number().integer().required(),
    bahan: Joi.array().items(bahanSchema).min(1).required(),
    langkahPembuatan: Joi.array()
      .items(langkahPembuatanSchema)
      .min(1)
      .required(),
  }),
};

const updateResep = {
  params: Joi.object({
    resepId: Joi.number().integer().required(),
  }),
  body: Joi.object({
    nama: Joi.string().optional(),
    photoResep: Joi.string().uri().optional().allow(null, ""),
    kategoriId: Joi.number().integer().optional(),
    userId: Joi.number().integer().optional(),
    isApproved: Joi.boolean().optional(),
    bahan: Joi.array().items(bahanSchema).optional(),
    langkahPembuatan: Joi.array().items(langkahPembuatanSchema).optional(),
  }).min(1),
};

const getResep = {
  params: Joi.object({
    resepId: Joi.number().integer().required(),
  }),
};

const deleteResep = {
  params: Joi.object().keys({
    resepId: Joi.number().required(),
  }),
};

const querySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(10),
  kategoriId: Joi.number().integer().optional(),
  userId: Joi.number().integer().optional(),
  isApproved: Joi.boolean().optional(),
});

export default { createResep, getResep, updateResep, deleteResep, querySchema };
