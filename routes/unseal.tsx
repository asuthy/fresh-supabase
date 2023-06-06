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
      <div class="flex flex-col items-center pt-10 text-gray-500 text-4xl">
        <h1 class="font-header font-semibold">Decrypt a document</h1>
      </div>

      <DecryptContainer />
    </Layout>
  );
}
