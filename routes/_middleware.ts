import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";
import { User } from "supabase";

import { redis } from "lib/redis.ts";

export type ServerState = {
  user: User | null;
  error: { code: number; msg: string } | null;
};

interface Session {
  user: User | null;
}

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<ServerState>,
) {
  const url = new URL(req.url);
  const cookies = getCookies(req.headers);
  const access_token = cookies.auth;

  let protectedRoute = false;

  if (
    url.pathname == "/share" || url.pathname == "/unseal"
  ) {
    protectedRoute = true;
  }

  const headers = new Headers();
  headers.set("location", "/");

  if (protectedRoute && !access_token) {
    // Can't use 403 if we want to redirect to home page.
    return new Response(null, { headers, status: 303 });
  }

  if (access_token) {
    const session = await redis.get(access_token) as Session;

    if (protectedRoute && !session) {
      return new Response(null, { headers, status: 303 });
    }

    const user = session?.user;
    ctx.state.user = user;
  }

  return await ctx.next();
}
