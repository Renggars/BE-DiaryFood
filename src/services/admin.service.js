const prisma = require("../../prisma");
const { supabase } = require("../utils/supabase");

const getDashboardData = async () => {
  try {
    // Get total users count
    const totalUsers = await prisma.user.count();

    // Get total recipes count
    const totalRecipes = await prisma.resep.count();

    // Get total categories count
    const totalCategories = await prisma.kategori.count();
    // Get latest 5 recipes with their category and user information
    const latestRecipes = await prisma.resep.findMany({
      take: 5,
      where: {
        isApproved: false,
      },
      include: {
        kategori: {
          select: {
            nama: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return {
      totalUsers,
      totalRecipes,
      totalCategories,
      latestRecipes,
    };
  } catch (error) {
    throw error;
  }
};

const getAllCategoriesData = async () => {
  try {
    const categories = await prisma.kategori.findMany({
      select: {
        id: true,
        nama: true,
        _count: {
          select: {
            resep: true, // Menghitung jumlah resep yang terkait dengan kategori
          },
        },
      },
    });

    // Format ulang hasil untuk mengubah _count.resep menjadi totalRecipes
    return categories.map((category) => ({
      id: category.id,
      nama: category.nama,
      totalRecipes: category._count.resep,
    }));
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getDashboardData,
  getAllCategoriesData,
};
  