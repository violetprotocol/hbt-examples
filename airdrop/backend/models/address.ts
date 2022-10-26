import Joi from "joi";
import { EthAddress } from "../../shared/types";

// Schema
export const ethAddressSchema = Joi.string()
  .regex(/^0x[a-fA-F0-9]{40}$/)
  .required();

// Validator
export function validateEthereumAddress(address: EthAddress) {
  return ethAddressSchema.validate(address);
}
