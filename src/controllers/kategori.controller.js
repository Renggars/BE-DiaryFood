const kategoriService = require("../services/kategori.service");
const {
  responseApiSuccess,
  responseApiFailed,
  responseApiCreateSuccess,
} = require("../utils/responseApi");

const getKategoris = async (req, res) => {
  try {
    const result = await kategoriService.getKategoris();
    responseApiSuccess(res, "Berhasil mengambil data kategori", result);
  } catch (err) {
    responseApiFailed(res, "Gagal mengambil data kategori");
  }
};

const getKategori = async (req, res) => {
  try {
    const result = await kategoriService.getKategoriById(req.params.kategoriId);
    responseApiSuccess(res, "Berhasil mengambil data kategori", result);
  } catch (err) {
    responseApiFailed(res, "Gagal mengambil data kategori");
  }
};

const createKategori = async (req, res) => {
  try {
    const result = await kategoriService.createKategori(req.body);
    responseApiCreateSuccess(res, "Berhasil membuat kategori", result);
  } catch (err) {
    responseApiFailed(res, "Gagal membuat kategori");
  }
};

const updateKategori = async (req, res) => {
  try {
    const result = await kategoriService.updateKategoriById(
      req.params.kategoriId,
      req.body
    );
    responseApiSuccess(res, "Berhasil mengubah kategori", result);
  } catch (err) {
    responseApiFailed(res, "Gagal mengubah kategori");
  }
};

const deleteKategori = async (req, res) => {
  try {
    const result = await kategoriService.deleteKategoriById(
      req.params.kategoriId
    );
    responseApiSuccess(res, "Berhasil menghapus kategori", result);
  } catch (err) {
    responseApiFailed(res, "Gagal menghapus kategori");
  }
};

module.exports = {
  getKategoris,
  getKategori,
  createKategori,
  updateKategori,
  deleteKategori,
};
