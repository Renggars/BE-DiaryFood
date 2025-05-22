import httpStatus from "http-status";
import prisma from "../../prisma/index.js";
import ApiError from "../utils/ApiError.js";

const createResep = async (data) => {
  return prisma.$transaction(async (tx) => {
    const resep = await tx.resep.create({
      data: {
        nama: data.nama,
        photoResep: data.photoResep,
        kategoriId: data.kategoriId,
        userId: data.userId,
        isApproved: false,
      },
    });

    await tx.bahan.createMany({
      data: data.bahan.map((bahan) => ({
        resepId: resep.id,
        nama: bahan.nama,
        jumlah: bahan.jumlah,
      })),
    });

    await tx.langkahPembuatan.createMany({
      data: data.langkahPembuatan.map((langkah) => ({
        resepId: resep.id,
        urutan: langkah.urutan,
        deskripsi: langkah.deskripsi,
      })),
    });

    const resepLengkap = await tx.resep.findUnique({
      where: { id: resep.id },
      include: {
        bahanList: true,
        langkahList: true,
      },
    });

    return resepLengkap;
  });
};

const queryReseps = async (filter, options) => {
  const page = options.page || 1;
  const limit = options.limit || 10;
  const skip = (page - 1) * limit;

  const reseps = await prisma.resep.findMany({
    where: {
      ...filter,
      isApproved: true,
    },
    skip,
    take: limit,
    include: {
      user: {
        select: {
          name: true,
          photo: true,
        },
      },
      bahanList: true,
      langkahList: {
        orderBy: {
          urutan: "asc",
        },
      },
    },
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
  const resep = await prisma.resep.findUnique({
    where: { id },
    include: {
      bahanList: true,
      langkahList: {
        orderBy: {
          urutan: "asc",
        },
      },
    },
  });
  if (!resep) throw new ApiError(httpStatus.NOT_FOUND, "Resep not found");
  return resep;
};

const updateResepById = async (id, updateBody) => {
  const existing = await prisma.resep.findUnique({ where: { id } });
  if (!existing) throw new ApiError(httpStatus.NOT_FOUND, "Resep not found");

  const operations = [];

  if (updateBody.bahan) {
    operations.push(prisma.bahan.deleteMany({ where: { resepId: id } }));
    operations.push(
      prisma.bahan.createMany({
        data: updateBody.bahan.map((bahan) => ({
          resepId: id,
          nama: bahan.nama,
          jumlah: bahan.jumlah,
        })),
      })
    );
    delete updateBody.bahan;
  }

  if (updateBody.langkahPembuatan) {
    operations.push(
      prisma.langkahPembuatan.deleteMany({ where: { resepId: id } })
    );
    operations.push(
      prisma.langkahPembuatan.createMany({
        data: updateBody.langkahPembuatan.map((langkah) => ({
          resepId: id,
          urutan: langkah.urutan,
          deskripsi: langkah.deskripsi,
        })),
      })
    );
    delete updateBody.langkahPembuatan;
  }

  operations.push(
    prisma.resep.update({
      where: { id },
      data: updateBody,
    })
  );

  await prisma.$transaction(operations);

  const updatedResep = await prisma.resep.findUnique({
    where: { id },
    include: {
      bahanList: true,
      langkahList: {
        orderBy: {
          urutan: "asc",
        },
      },
    },
  });

  return updatedResep;
};

const deleteResepById = async (id) => {
  const existingResep = await prisma.resep.findUnique({ where: { id } });
  if (!existingResep)
    throw new ApiError(httpStatus.NOT_FOUND, "Resep not found");

  return prisma.resep.delete({
    where: { id },
    include: {
      bahanList: true,
      langkahList: {
        orderBy: {
          urutan: "asc",
        },
      },
    },
  });
};

export default {
  createResep,
  queryReseps,
  getResepById,
  updateResepById,
  deleteResepById,
};
