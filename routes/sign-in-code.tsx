import { Handlers, PageProps } from "$fresh/server.ts";

import { ServerState } from "routes/_middleware.ts";
import { Layout } from "components/index.ts";
import SignInCodeDialog from "islands/SignInCodeDialog.tsx";

export const handler: Handlers = {
  GET(_req, ctx) {
    return ctx.render(ctx.state);
  },
};

export default function Page(props: PageProps<ServerState>) {
  return (
    <Layout state={props.data}>
      <div class="flex justify-center">
        <div class="flex flex-col items-stretch w-[500px] md:w-2/3">
          <SignInCodeDialog />
        </div>
      </div>
    </Layout>
  );
}
