const resepService = require("../services/resep.service");
const {
  responseApiSuccess,
  responseApiFailed,
  responseApiCreateSuccess,
} = require("../utils/responseApi");
const resepValidation = require("../validations/resep.validation");

const getReseps = async (req, res) => {
  try {
    const { error, value } = resepValidation.querySchema.validate(req.query);
    if (error) throw error;

    const { page, limit, ...filter } = value;

    const result = await resepService.queryReseps(filter, { page, limit });
    responseApiSuccess(res, "Success get reseps", result);
  } catch (err) {
    console.log(err);
    responseApiFailed(res, "Failed get reseps");
  }
};

const getResep = async (req, res) => {
  try {
    const result = await resepService.getResepById(req.params.resepId);
    responseApiSuccess(res, "Success get resep", result);
  } catch (err) {
    responseApiFailed(res, "Failed get resep");
  }
};

const createResep = async (req, res) => {
  try {
    const result = await resepService.createResep(req.body);
    responseApiCreateSuccess(res, "Success create resep", result);
  } catch (err) {
    console.log(err);
    responseApiFailed(res, "Failed create resep");
  }
};

const updateResep = async (req, res) => {
  try {
    const result = await resepService.updateResepById(
      req.params.resepId,
      req.body
    );
    responseApiSuccess(res, "Success update resep", result);
  } catch (err) {
    console.log(err);
    responseApiFailed(res, "Failed update resep");
  }
};

const deleteResep = async (req, res) => {
  try {
    const result = await resepService.deleteResepById(+req.params.resepId);
    responseApiSuccess(res, "Success delete resep", result);
  } catch (err) {
    responseApiFailed(res, "Failed delete resep");
  }
};

module.exports = {
  getReseps,
  getResep,
  createResep,
  updateResep,
  deleteResep,
};
