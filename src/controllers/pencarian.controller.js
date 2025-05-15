const pencarianService = require("../services/pencarian.service");
const {
  responseApiSuccess,
  responseApiFailed,
  responseApiCreateSuccess,
} = require("../utils/responseApi");

const createPencarian = async (req, res) => {
  try {
    const result = await pencarianService.createPencarian(req.body);
    responseApiCreateSuccess(res, "Berhasil simpan pencarian", result);
  } catch (err) {
    console.log(err);
    responseApiFailed(res, "Gagal simpan pencarian");
  }
};

const getAllPencarian = async (req, res) => {
  try {
    const result = await pencarianService.getAllPencarian(req.query);
    responseApiSuccess(res, "Berhasil ambil data pencarian", result);
  } catch (err) {
    responseApiFailed(res, "Gagal ambil data pencarian");
  }
};

const getPencarianById = async (req, res) => {
  try {
    const result = await pencarianService.getPencarianById(
      parseInt(req.params.id)
    );
    responseApiSuccess(res, "Berhasil ambil detail pencarian", result);
  } catch (err) {
    responseApiFailed(res, "Gagal ambil detail pencarian");
  }
};

const deletePencarian = async (req, res) => {
  try {
    const result = await pencarianService.deletePencarian(
      parseInt(req.params.id)
    );
    responseApiSuccess(res, "Berhasil hapus pencarian", result);
  } catch (err) {
    responseApiFailed(res, "Gagal hapus pencarian");
  }
};

module.exports = {
  createPencarian,
  getAllPencarian,
  getPencarianById,
  deletePencarian,
};
