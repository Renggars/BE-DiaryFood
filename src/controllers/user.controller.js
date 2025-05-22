import userService from "../services/user.service.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import {
  responseApiSuccess,
  responseApiFailed,
  responseApiCreateSuccess,
} from "../utils/responseApi.js";

const getUsers = async (req, res) => {
  try {
    const { page, limit, ...filter } = req.query;
    const result = await userService.queryUsers(filter, {
      page,
      limit,
    });

    responseApiSuccess(res, "Success get users", result);
  } catch (err) {
    console.log(err);
    responseApiFailed(res, `Failed get Users ${err}`);
  }
};

const getUser = async (req, res) => {
  try {
    const result = await userService.getUserById(req.params.userId);
    console.log(result);
    responseApiSuccess(res, "Success get user", result);
  } catch (err) {
    responseApiFailed(res, "Failed get user");
  }
};

const createUser = async (req, res) => {
  try {
    const result = await userService.createUser(req.body, req.file);
    responseApiCreateSuccess(res, "Success create user", result);
  } catch (err) {
    responseApiFailed(res, "Failed create user");
  }
};

const updateUser = async (req, res) => {
  try {
    const result = await userService.updateUserById(
      req.params.userId,
      req.body
    );
    if (!result) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    responseApiSuccess(res, "Success update user", result);
  } catch (err) {
    console.log(err);
    responseApiFailed(res, "Failed update user");
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await userService.deleteUserById(req.params.userId);
    responseApiSuccess(res, "Success delete user", result);
  } catch (err) {
    console.log(err);
    responseApiFailed(res, "Failed delete user");
  }
};

export default { getUsers, getUser, createUser, updateUser, deleteUser };
