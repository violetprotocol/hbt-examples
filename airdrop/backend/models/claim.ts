import Joi from "joi";
import mongoose from "mongoose";
import { IClaim } from "../../shared/types";
import { ethAddressSchema } from "./address";

// Schema
const schema = Joi.object({
  address: ethAddressSchema,
  amount: Joi.number().required(),
});

// Validator
export function validateClaim(claim: IClaim) {
  return schema.validate(claim);
}

// Model
export const Address = mongoose.model<IClaim>(
  "Claims",
  new mongoose.Schema({
    address: { type: String, length: 42, required: true, unique: true },
    amount: { type: Number, required: true },
  })
);
