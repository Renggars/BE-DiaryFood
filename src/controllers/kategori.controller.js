const kategoriService = require("../services/kategori.service");
const {
  responseApiSuccess,
  responseApiFailed,
  responseApiCreateSuccess,
} = require("../utils/responseApi");

const getKategoris = async (req, res) => {
  try {
    const result = await kategoriService.getKategoris();
    responseApiSuccess(res, "Success get categorys", result);
  } catch (err) {
    responseApiFailed(res, "Failed get categorys");
  }
};

const getKategori = async (req, res) => {
  try {
    const result = await kategoriService.getKategoriById(req.params.kategoriId);
    responseApiSuccess(res, "Success get category", result);
  } catch (err) {
    responseApiFailed(res, "Failed get category");
  }
};

const createKategori = async (req, res) => {
  try {
    const result = await kategoriService.createKategori(req.body);
    responseApiCreateSuccess(res, "Success create category", result);
  } catch (err) {
    responseApiFailed(res, "Failed create category");
  }
};

const updateKategori = async (req, res) => {
  try {
    const result = await kategoriService.updateKategoriById(
      req.params.kategoriId,
      req.body
    );
    responseApiSuccess(res, "Success update category", result);
  } catch (err) {
    responseApiFailed(res, "Failed update category");
  }
};

const deleteKategori = async (req, res) => {
  try {
    const result = await kategoriService.deleteKategoriById(
      req.params.kategoriId
    );
    responseApiSuccess(res, "Success delete category", result);
  } catch (err) {
    responseApiFailed(res, "Failed delete category");
  }
};

module.exports = {
  getKategoris,
  getKategori,
  createKategori,
  updateKategori,
  deleteKategori,
};
