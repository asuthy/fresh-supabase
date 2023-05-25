import { Head } from "$fresh/runtime.ts";
import { ComponentChildren } from "preact";

import { ServerState } from "routes/_middleware.ts";
import { NavButton, NavLink } from "components/index.ts";

type Props = {
  children: ComponentChildren;
  state: ServerState;
};

export function Layout(props: Props) {
  const isAllowed = !!props.state.user;

  const buttProps = isAllowed
    ? { href: "/api/sign-out", text: "Sign Out" }
    : { href: "/sign-in", text: "Sign In" };

  return (
    <>
      <Head>
        <title>Copyfuse</title>
      </Head>

      <div class="bg-primary">
        <nav class="flex items-center justify-between flex-wrap min-h-[60px] max-w-screen-md mx-auto">
          <a href="/">
            <div class="flex flex-shrink-0 border-white">
              <h1 class="ml-2 text-white">Copyfuse</h1>
            </div>
          </a>

          <div class="flex flex-grow border-gray pt-1">
            <div class="flex flex-grow">
              <NavLink href="/secret">Secret</NavLink>
            </div>
            <div class="flex sm:flex-shrink-0">
              <NavButton href={buttProps.href}>{buttProps.text}</NavButton>
            </div>
          </div>
        </nav>
      </div>

      <div class="mx-auto max-w-screen-md p-4">
        {props.children}
      </div>
    </>
  );
}
