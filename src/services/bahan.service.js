const prisma = require("../../prisma");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const getBahanById = async (bahanId) => {
  return prisma.bahan.findUnique({
    where: { id: parseInt(bahanId) },
  });
};

const updateBahanById = async (bahanId, updateBody) => {
  const bahan = await getBahanById(bahanId);
  if (!bahan) throw new ApiError(httpStatus.NOT_FOUND, "Bahan not found");

  return prisma.bahan.update({
    where: { id: parseInt(bahanId) },
    data: updateBody,
  });
};

const deleteBahanById = async (bahanId) => {
  const bahan = await getBahanById(bahanId);
  if (!bahan) throw new ApiError(httpStatus.NOT_FOUND, "Bahan not found");

  return prisma.bahan.delete({
    where: { id: parseInt(bahanId) },
  });
};

module.exports = { updateBahanById, deleteBahanById };
