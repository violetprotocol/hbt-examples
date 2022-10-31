import express, { Response } from "express";
import {
  ContainerTypes,
  ValidatedRequest,
  ValidatedRequestSchema,
  createValidator,
} from "express-joi-validation";
import Joi from "joi";
import { BackendErrors, EthAddress } from "../../shared/types";
import { signedInWithEthereum } from "../middleware/siwe";
import { ethAddressSchema } from "../models/address";
import { hasRegisterSucceeded, register } from "../core/registration";

interface RegisterAddressRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    addressToRegister: EthAddress;
    signature: string;
  };
}
const registerAddressSchema = Joi.object({
  addressToRegister: ethAddressSchema,
  signature: Joi.string().required(),
});

const validator = createValidator();

const router = express.Router();
router.post(
  "/",
  signedInWithEthereum,
  validator.body(registerAddressSchema),
  async (
    req: ValidatedRequest<RegisterAddressRequestSchema>,
    res: Response
  ) => {
    const { addressToRegister, signature } = req.body;
    const signedInAddress = req.session.siwe?.address;
    console.log(`Registering ${addressToRegister}`);

    // This should already be guaranteed by the middleware
    if (!signedInAddress) {
      res.status(400).send({ error: BackendErrors.NOT_SIGNED_IN });
      return;
    }
    try {
      const result = await register({
        addressToRegister,
        signature,
        signedInAddress,
      });

      if (hasRegisterSucceeded(result)) {
        return res.status(201).json({
          registeredAddress: result.address,
        });
      }

      if (result?.error) {
        switch (result.error) {
          case BackendErrors.INVALID_SIGNATURE_PROVIDED:
            return res.status(400).send(result);
          case BackendErrors.NOT_AN_HBT_OWNER:
            return res.status(403).send(result);
          case BackendErrors.QUOTA_REACHED:
            return res.status(200).send(result);
          default:
            console.error(result);
            return res.status(500).send();
        }
      }
    } catch (error) {
      console.error("Error while registering address", error);
      return res.status(500).send();
    }
  }
);

export default router;
