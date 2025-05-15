const langkahService = require("../services/langkah.service");
const {
  responseApiSuccess,
  responseApiFailed,
} = require("../utils/responseApi");

const updateLangkah = async (req, res) => {
  try {
    const result = await langkahService.updateLangkahById(
      req.params.langkahId,
      req.body
    );
    responseApiSuccess(res, "Success update langkah", result);
  } catch (err) {
    console.log(err);
    responseApiFailed(res, "Failed update langkah");
  }
};

const deleteLangkah = async (req, res) => {
  try {
    const result = await langkahService.deleteLangkahById(req.params.langkahId);
    responseApiSuccess(res, "Success delete langkah", result);
  } catch (err) {
    console.log(err);
    responseApiFailed(res, "Failed delete langkah");
  }
};

module.exports = { updateLangkah, deleteLangkah };
