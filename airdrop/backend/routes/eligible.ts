import express, { Response } from "express";
import {
  ContainerTypes,
  ValidatedRequest,
  ValidatedRequestSchema,
  createValidator,
} from "express-joi-validation";
import Joi from "joi";
import { EthAddress } from "../../shared/types";
import { getEligibility } from "../core/eligibility";
import { ethAddressSchema } from "../models/address";

interface EligibleAddressRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Params]: {
    address: EthAddress;
  };
}
const eligibleAddressSchema = Joi.object({
  address: ethAddressSchema,
});

const validator = createValidator();

const router = express.Router();
router.get(
  "/:address",
  validator.params(eligibleAddressSchema),
  async (
    req: ValidatedRequest<EligibleAddressRequestSchema>,
    res: Response
  ) => {
    const address = req.params.address;
    const eligibility = getEligibility(address);

    res.status(200).json(eligibility);
  }
);

export default router;
