import type { NextFunction, Response } from "express";
import { BackendErrors } from "../../shared/types";

/** Checks that the caller is signed-in with Ethereum */
export function signedInWithEthereum(
  req: any,
  res: Response,
  next: NextFunction
) {
  if (!req.session.siwe || !req.session?.siwe.address) {
    res
      .status(401)
      .json({
        error: BackendErrors.NOT_SIGNED_IN,
        message: "Please sign-in with an Ethereum address first",
      });
    return;
  }
  next();
}
