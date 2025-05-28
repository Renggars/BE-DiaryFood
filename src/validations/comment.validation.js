import Joi from "joi";

const createComment = {
  body: Joi.object().keys({
    comment: Joi.string().required(),
  }),
};

export default {
  createComment,
};
