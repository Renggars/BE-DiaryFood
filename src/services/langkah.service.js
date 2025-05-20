const prisma = require("../../prisma");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const createLangkah = async (langkah) => {
  return prisma.langkahPembuatan.create({ data: langkah });
};

const getLangkahById = async (langkahId) => {
  return prisma.langkahPembuatan.findUnique({
    where: { id: parseInt(langkahId) },
  });
};

const updateLangkahById = async (langkahId, updateBody) => {
  const langkah = await getLangkahById(langkahId);
  if (!langkah) throw new ApiError(httpStatus.NOT_FOUND, "Langkah not found");

  return prisma.langkahPembuatan.update({
    where: { id: parseInt(langkahId) },
    data: updateBody,
  });
};

const deleteLangkahById = async (langkahId) => {
  const langkah = await getLangkahById(langkahId);
  if (!langkah) throw new ApiError(httpStatus.NOT_FOUND, "Langkah not found");

  return prisma.langkahPembuatan.delete({
    where: { id: parseInt(langkahId) },
  });
};

module.exports = { createLangkah, updateLangkahById, deleteLangkahById };
