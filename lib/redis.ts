import { Redis } from "@upstash/redis";

const REDIS_URL = Deno.env.get("REDIS_URL") || "";
const REDIS_TOKEN = Deno.env.get("REDIS_TOKEN") || "";

console.log({
  url: REDIS_URL,
  token: REDIS_TOKEN,
});

export const redis = await new Redis({
  url: REDIS_URL,
  token: REDIS_TOKEN,
});
