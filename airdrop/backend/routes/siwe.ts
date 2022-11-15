import express from "express";
import { generateNonce, ErrorTypes, SiweMessage } from "siwe";

const router = express.Router();

router.get("/nonce", async function (req: Express.Request, res) {
  req.session.nonce = generateNonce();
  res.setHeader("Content-Type", "text/plain");
  res.status(200).send(req.session.nonce);
});

router.post("/verify", async function (req: any, res) {
  try {
    if (!req.body.message) {
      res
        .status(422)
        .json({ message: "Expected prepareMessage object as body." });
      return;
    }

    let message = new SiweMessage(req.body.message);
    const fields = await message.validate(req.body.signature);
    if (fields.nonce !== req.session.nonce) {
      res.status(422).json({
        message: `Invalid nonce.`,
      });
      return;
    }
    req.session.siwe = fields;
    if (!fields.expirationTime) {
      res.status(422).json({
        message: `Missing expiration time.`,
      });
      return;
    }
    req.session.cookie.expires = new Date(fields.expirationTime);
    req.session.save(() =>
      res
        .status(200)
        .json({ isSignedIn: true, signedInAddress: fields.address })
    );
  } catch (e: any) {
    req.session.siwe = null;
    req.session.nonce = null;
    console.error(e);
    switch (e) {
      case ErrorTypes.EXPIRED_MESSAGE: {
        req.session.save(() => res.status(440).json({ message: e.message }));
        break;
      }
      case ErrorTypes.INVALID_SIGNATURE: {
        req.session.save(() => res.status(422).json({ message: e.message }));
        break;
      }
      default: {
        req.session.save(() => res.status(500).json({ message: e.message }));
        break;
      }
    }
  }
});

export default router;
