import { connect } from "redis";

const REDIS_USER = Deno.env.get("REDIS_USER") || "";
const REDIS_PASSWORD = Deno.env.get("REDIS_PASSWORD") || "";
const REDIS_HOSTNAME = Deno.env.get("REDIS_HOSTNAME") || "";
const REDIS_PORT = Deno.env.get("REDIS_PORT") || "";

export const redis = await connect({
  username: REDIS_USER,
  password: REDIS_PASSWORD,
  hostname: REDIS_HOSTNAME,
  port: REDIS_PORT,
});
