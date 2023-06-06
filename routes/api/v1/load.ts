import { Handlers } from "$fresh/server.ts";
import { redis } from "lib/redis.ts";

type Request = {
  encrypted: string;
  ttl?: number;
  reads: number;
  iv: string;
};

export const handler: Handlers = {
  async GET(req) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) {
      //return new NextResponse("id param is missing", { status: 400 });
    }
    const key = ["envshare", id].join(":");

    const [data, _] = await Promise.all([
      await redis.hgetall<
        { encrypted: string; remainingReads: number | null; iv: string }
      >(key),
      await redis.incr("envshare:metrics:reads"),
    ]);

    if (data) {
      if (data.remainingReads !== null && data.remainingReads < 1) {
        await redis.del(key);
        //return new NextResponse("Not Found", { status: 404 });
      }

      let remainingReads: number | null = null;
      if (data.remainingReads !== null) {
        // Decrement the number of reads and return the remaining reads
        remainingReads = await redis.hincrby(key, "remainingReads", -1);
      }

      return Response.json({
        iv: data.iv,
        encrypted: data.encrypted,
        remainingReads,
      });
    } else {
      return Response.json({});
      //return new NextResponse("Not Found", { status: 404 });
    }
  },
};
