import httpStatus from "http-status";
import prisma from "../../prisma/index.js";
import ApiError from "../utils/ApiError.js";

const createKategori = async (body) => {
  const kategori = await prisma.kategori.create({
    data: body,
  });
  return kategori;
};

const getKategoris = async () => {
  return prisma.kategori.findMany({
    include: {
      resep: true,
    },
  });
};

const getKategoriById = async (id) => {
  const kategori = await prisma.kategori.findUnique({
    where: { id: Number(id) },
    include: {
      resep: true,
    },
  });
  if (!kategori) {
    throw new ApiError(httpStatus.NOT_FOUND, "Kategori tidak ditemukan");
  }
  return kategori;
};

const updateKategoriById = async (id, data) => {
  const kategori = await prisma.kategori.findUnique({
    where: { id: Number(id) },
  });
  if (!kategori) {
    throw new ApiError(httpStatus.NOT_FOUND, "Kategori tidak ditemukan");
  }
  return prisma.kategori.update({
    where: { id: Number(id) },
    data,
  });
};

const deleteKategoriById = async (id) => {
  const kategori = await prisma.kategori.findUnique({
    where: { id: Number(id) },
  });
  if (!kategori) {
    throw new ApiError(httpStatus.NOT_FOUND, "Kategori tidak ditemukan");
  }
  return prisma.kategori.delete({
    where: { id: Number(id) },
  });
};

export default {
  createKategori,
  getKategoris,
  getKategoriById,
  updateKategoriById,
  deleteKategoriById,
};
