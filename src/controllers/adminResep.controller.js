const adminResepService = require("../services/adminResep.service");
const {
  responseApiSuccess,
  responseApiFailed,
} = require("../utils/responseApi");

const getPendingReseps = async (req, res) => {
  try {
    const data = await adminResepService.getPendingReseps(req.query);
    responseApiSuccess(res, "Resep pending berhasil diambil", data);
  } catch (err) {
    responseApiFailed(res, "Gagal ambil resep pending");
  }
};

const approveResep = async (req, res) => {
  try {
    const data = await adminResepService.approveResep(parseInt(req.params.id));
    responseApiSuccess(res, "Resep berhasil diapprove", data);
  } catch (err) {
    responseApiFailed(res, "Gagal approve resep");
  }
};

const rejectResep = async (req, res) => {
  try {
    const data = await adminResepService.rejectResep(parseInt(req.params.id));
    responseApiSuccess(res, "Resep berhasil direject", data);
  } catch (err) {
    responseApiFailed(res, "Gagal reject resep");
  }
};

module.exports = {
  getPendingReseps,
  approveResep,
  rejectResep,
};
