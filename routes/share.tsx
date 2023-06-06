import { Handlers, PageProps } from "$fresh/server.ts";

import { ServerState } from "routes/_middleware.ts";
import { Layout } from "components/index.ts";
import EncryptContainer from "islands/EncryptContainer.tsx";

export const handler: Handlers = {
  GET(_req, ctx) {
    return ctx.render(ctx.state);
  },
};

export default function Secret(props: PageProps<ServerState>) {
  return (
    <Layout state={props.data}>
      <div class="flex flex-col items-center pt-10 text-gray-500 text-4xl">
        <h1 class="font-header font-semibold">Encrypt and Share</h1>
      </div>
      <div>
        <EncryptContainer />
      </div>
    </Layout>
  );
}
