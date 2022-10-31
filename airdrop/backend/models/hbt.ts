import Joi from "joi";
import mongoose, { Document, ObjectId } from "mongoose";
import { IHBT } from "../../shared/types";

// Joi Schema
export const HbtSchema = Joi.object({
  _id: Joi.string().required(),
  numberOfRegisteredAddresses: Joi.number().required(),
});

export type HBTDocument = Document<ObjectId> & IHBT;

// Model
export const HBT = mongoose.model<IHBT>(
  "HBT",
  new mongoose.Schema({
    _id: { type: String, required: true, unique: true },
    numberOfRegisteredAddresses: { type: Number, required: true },
  })
);
