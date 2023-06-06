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
      <div class="h-full items-center justify-center">
        <div class="w-[800px]">
          <EncryptContainer />
        </div>
      </div>
    </Layout>
  );
}
