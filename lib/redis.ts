import { Redis } from "@upstash/redis";

const REDIS_USER = Deno.env.get("REDIS_USER") || "";
const REDIS_PASSWORD = Deno.env.get("REDIS_PASSWORD") || "";
const REDIS_HOSTNAME = Deno.env.get("REDIS_HOSTNAME") || "";
const REDIS_PORT = Deno.env.get("REDIS_PORT") || "";

export const redis = await new Redis({
  url: "https://eu1-choice-yak-39667.upstash.io",
  token:
    "AZrzASQgYzlhYjI5NTItMjA2Ni00ZGY3LThlNmQtNjNmYjcxNGFiMjU4YWMxMjE2ZjYwOTNlNGRlZDk4OWUyZTdkZmMwMzk5ZGY=",
});
