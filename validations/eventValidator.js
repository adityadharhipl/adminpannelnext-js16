import Joi from "joi";

const pricingTierSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(0).required(),
  capacity: Joi.number().min(0).optional(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional()
});

const extraSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow("", null),
  price: Joi.number().min(0).required(),
  maxQuantityPerOrder: Joi.number().min(1).default(1)
});

export const createEventSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow("", null),
  location: Joi.object({
    name: Joi.string().allow("", null),
    address: Joi.string().allow("", null),
    lat: Joi.number().optional(),
    lng: Joi.number().optional()
  }).optional(),
  startDate: Joi.date().required(),
  endDate: Joi.date().optional(),
  capacity: Joi.number().integer().min(0).required(),
  pricing: Joi.array().items(pricingTierSchema).optional(),
  extras: Joi.array().items(extraSchema).optional(),
  published: Joi.boolean().optional(),
  metadata: Joi.object().optional()
});

export const updateEventSchema = createEventSchema.min(1);
