import { Handlers, PageProps } from "$fresh/server.ts";

import { ServerState } from "routes/_middleware.ts";
import { Layout, NavButton } from "components/index.ts";

export const handler: Handlers = {
  GET(_req, ctx) {
    return ctx.render(ctx.state);
  },
};

export default function Home(props: PageProps<ServerState>) {
  const isAllowed = !!props.data.user;
  return (
    <Layout state={props.data}>
      <div class="flex items-center justify-center h-full">
        <div class="">
          <p class="pb-2 text-gray-400 text-center text-6xl font-header font-semibold">
            Share Environment
          </p>
          <p class="pb-6 text-gray-500 text-center text-6xl font-header font-semibold">
            Variables Securely
          </p>
          <p class="pt-2 pb-4 text-gray-500 text-center">
            Your document is encrypted in your browser before being stored for a
            limited period of time and read operations. Unencrypted data never
            leaves your browser.
          </p>
          {isAllowed
            ? (
              <div class="flex flex-col items-center justify-center">
                <NavButton href="/share">
                  Share
                </NavButton>
              </div>
            )
            : <div></div>}
        </div>
      </div>
    </Layout>
  );
}
