import { Handlers, PageProps } from "$fresh/server.ts";

import { ServerState } from "routes/_middleware.ts";
import { Layout } from "components/index.ts";
import DecryptContainer from "islands/DecryptContainer.tsx";

export const handler: Handlers = {
  GET(_req, ctx) {
    return ctx.render(ctx.state);
  },
};

export default function Unseal(props: PageProps<ServerState>) {
  return (
    <Layout state={props.data}>
      <div class="h-full items-center justify-center">
        <div class="w-[800px]">
          <div class="text-gray-400 text-4xl items-center justify-center">
            <h1 class="font-header font-semibold w-full text-center">
              Decrypt a document
            </h1>
          </div>
          <DecryptContainer />
        </div>
      </div>
    </Layout>
  );
}
