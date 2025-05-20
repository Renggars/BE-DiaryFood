const bahanService = require("../services/bahan.service");
const {
  responseApiSuccess,
  responseApiFailed,
} = require("../utils/responseApi");

const createBahan = async (req, res) => {
  try {
    const result = await bahanService.createBahan(req.body);
    responseApiSuccess(res, "Success create bahan", result);
  } catch (err) {
    console.log(err);
    responseApiFailed(res, "Failed create bahan");
  }
};

const updateBahan = async (req, res) => {
  try {
    const result = await bahanService.updateBahanById(
      req.params.bahanId,
      req.body
    );
    responseApiSuccess(res, "Success update bahan", result);
  } catch (err) {
    console.log(err);
    responseApiFailed(res, "Failed update bahan");
  }
};

const deleteBahan = async (req, res) => {
  try {
    const result = await bahanService.deleteBahanById(req.params.bahanId);
    responseApiSuccess(res, "Success delete bahan", result);
  } catch (err) {
    console.log(err);
    responseApiFailed(res, "Failed delete bahan");
  }
};

module.exports = { createBahan, updateBahan, deleteBahan };
