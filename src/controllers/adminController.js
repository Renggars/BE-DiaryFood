const { responseApiSuccess, responseApiFailed } = require("../utils/responseApi");
const { getDashboardData, getAllCategoriesData } = require("../services/admin.service");

const getDashboard = async (req, res) => {
  try {
    const dashboardData = await getDashboardData();
    return responseApiSuccess(res, "Successfully retrieved dashboard data", dashboardData);
  } catch (error) {
    return responseApiFailed(res, error.message);
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await getAllCategoriesData();
    return responseApiSuccess(res, "Berhasil mengambil kategori", categories);
  } catch (error) {
    return responseApiFailed(res, error.message);
  }
};
const addCategory = async (req, res) => {
  try {
  } catch (error) {
    return responseApiFailed(res, error.message);
  }
};

module.exports = {
  getDashboard,
  getAllCategories,
  addCategory,
};
