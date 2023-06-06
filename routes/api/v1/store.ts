import { Handlers } from "$fresh/server.ts";

import { generateId } from "pkg/id.ts";
import { redis } from "lib/redis.ts";

type Request = {
  encrypted: string;
  ttl?: number;
  reads: number;
  iv: string;
};

export const handler: Handlers = {
  async POST(req) {
    const { encrypted, ttl, reads, iv } = (await req.json()) as Request;

    const id = generateId();
    const key = ["envshare", id].join(":");

    const tx = redis.multi();

    tx.hset(key, {
      remainingReads: reads > 0 ? reads : null,
      encrypted,
      iv,
    });
    if (ttl) {
      tx.expire(key, ttl);
    }
    tx.incr("envshare:metrics:writes");

    await tx.exec();

    return Response.json({ id });
  },
};
