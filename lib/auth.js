import { SignJWT, jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode("SUPER_SECRET_KEY_XMIKI_222");

export async function signToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(SECRET_KEY);
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload;
  } catch (err) {
    return null;
  }
}
