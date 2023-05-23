import { Handlers, PageProps } from "$fresh/server.ts";

import { ServerState } from "routes/_middleware.ts";
import { Layout, Link } from "components/index.ts";
import { NavButton, NavLink } from "components/index.ts";

export const handler: Handlers = {
  GET(_req, ctx) {
    return ctx.render(ctx.state);
  },
};

export default function Home(props: PageProps<ServerState>) {
  const isAllowed = !!props.data.user;
  return (
    <Layout state={props.data}>

      <p class="pt-8 pb-6 text-gray-500">
        <Link href="https://fresh.deno.dev/" target="_blank">Fresh</Link>,{" "}
        {" "}
        <Link href="https://supabase.com/" target="_blank">
          Supabase
        </Link>{" "}
        and <Link href="https://redis.io/" target="_blank">Redis</Link>{" "}
        implementing a simple cookie-based authentication scheme.
      </p>

      {!isAllowed
        ? <Link href="/sign-in">Sign In</Link>
        : <Link href="/api/sign-out">Sign Out</Link>}
    </Layout>
  );
}
