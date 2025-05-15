// File: services/resep.service.js
const httpStatus = require("http-status");
const prisma = require("../../prisma/index");
const ApiError = require("../utils/ApiError");

const createResep = async (data) => {
  return prisma.$transaction(async (tx) => {
    const resep = await tx.resep.create({
      data: {
        nama: data.nama,
        thumbnail: data.thumbnail,
        kategoriId: data.kategoriId,
        userId: data.userId,
        isApproved: false,
      },
    });

    if (data.bahan && Array.isArray(data.bahan)) {
      await tx.bahan.createMany({
        data: data.bahan.map((b) => ({
          resepId: resep.id,
          nama: b.nama,
          jumlah: b.jumlah,
        })),
      });
    }

    if (data.langkahPembuatan && Array.isArray(data.langkahPembuatan)) {
      await tx.langkahPembuatan.createMany({
        data: data.langkahPembuatan.map((l) => ({
          resepId: resep.id,
          urutan: l.urutan,
          deskripsi: l.deskripsi,
        })),
      });
    }

    return resep;
  });
};

const queryReseps = async (filter, options) => {
  const page = options.page || 1;
  const limit = options.limit || 10;
  const skip = (page - 1) * limit;

  const reseps = await prisma.resep.findMany({
    where: filter,
    skip,
    take: limit,
  });

  const totalItems = await prisma.resep.count({ where: filter });
  const totalPages = Math.ceil(totalItems / limit);

  return {
    reseps,
    pagination: {
      totalItems,
      totalPages,
      currentPage: page,
    },
  };
};

const getResepById = async (id) => {
  const resep = await prisma.resep.findUnique({ where: { id } });
  if (!resep) throw new ApiError(httpStatus.NOT_FOUND, "Resep not found");
  return resep;
};

const updateResepById = async (id, updateBody) => {
  const existing = await prisma.resep.findUnique({ where: { id } });
  if (!existing) throw new ApiError(httpStatus.NOT_FOUND, "Resep not found");

  return prisma.resep.update({
    where: { id },
    data: updateBody,
  });
};

const deleteResepById = async (id) => {
  const existing = await prisma.resep.findUnique({ where: { id } });
  if (!existing) throw new ApiError(httpStatus.NOT_FOUND, "Resep not found");

  return prisma.resep.delete({ where: { id } });
};

module.exports = {
  createResep,
  queryReseps,
  getResepById,
  updateResepById,
  deleteResepById,
};
