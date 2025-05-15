const prisma = require("../../prisma");

const createPencarian = async ({ userId, kataKunci, hasilResepIds }) => {
  return await prisma.pencarian.create({
    data: {
      userId,
      kataKunci,
      hasilPencarian: {
        create: hasilResepIds.map((resepId) => ({ resepId })),
      },
    },
    include: {
      hasilPencarian: {
        include: { resep: true },
      },
    },
  });
};

const getAllPencarian = async ({ userId, page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;

  const data = await prisma.pencarian.findMany({
    where: { userId },
    skip,
    take: parseInt(limit),
    orderBy: { tanggalPencarian: "desc" },
  });

  const totalItems = await prisma.pencarian.count({ where: { userId } });
  const totalPages = Math.ceil(totalItems / limit);

  return {
    data,
    pagination: { totalItems, totalPages, currentPage: parseInt(page) },
  };
};

const getPencarianById = async (id) => {
  return prisma.pencarian.findUnique({
    where: { id },
    include: {
      hasilPencarian: {
        include: { resep: true },
      },
    },
  });
};

const deletePencarian = async (id) => {
  await prisma.hasilPencarian.deleteMany({ where: { pencarianId: id } });
  return prisma.pencarian.delete({ where: { id } });
};

module.exports = {
  createPencarian,
  getAllPencarian,
  getPencarianById,
  deletePencarian,
};
