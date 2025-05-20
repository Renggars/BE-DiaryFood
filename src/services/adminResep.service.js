const prisma = require("../../prisma");
const { supabase } = require("../utils/supabase");

const getPendingReseps = async ({ page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;
  const data = await prisma.resep.findMany({
    where: { isApproved: false },
    skip,
    take: parseInt(limit),
    orderBy: { createdAt: "desc" },
  });

  const total = await prisma.resep.count({ where: { status: "pending" } });
  return {
    data,
    pagination: {
      totalItems: total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    },
  };
};

const approveResep = async (id) => {
  return prisma.resep.update({
    where: { id },
    data: { isApproved: true },
  });
};

const rejectResep = async (id) => {
  return prisma.resep.update({
    where: { id },
    data: { isApproved: false },
  });
};

module.exports = {
  getPendingReseps,
  approveResep,
  rejectResep,
};
