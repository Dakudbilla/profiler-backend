import Joi from 'joi';

/**
 * Validate data that will be passed for creating a post
 */
const create = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
});

export default { create };
