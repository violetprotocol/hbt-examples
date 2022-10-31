import session from "express-session";
import { SiweMessage } from "siwe";

declare module "express-session" {
  export interface SessionData {
    nonce: string | null;
    siwe: SiweMessage | null;
  }
}

export {};
