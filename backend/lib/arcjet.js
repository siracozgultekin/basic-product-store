import arcjet, { detectBot, tokenBucket } from "@arcjet/node";
import dotenv from "dotenv";

dotenv.config();

//initialize the arcjet client

export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    // shield'ı aktifleştirince 403 shield hatası veriyor ve data gelmiyor.
    // shield({ mode: "LIVE" }),
    detectBot({ mode: "LIVE", allow: ["CATEGORY:SEARCH_ENGINE"] }),

    tokenBucket({
      mode: "LIVE",
      refillRate: 20,
      interval: 20,
      capacity: 20,
    }),
  ],
});
