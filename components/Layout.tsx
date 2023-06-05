import { Head } from "$fresh/runtime.ts";
import { ComponentChildren } from "preact";

import { ServerState } from "routes/_middleware.ts";
import { NavLink } from "components/index.ts";
import SignInDialog from "islands/SignInDialog.tsx";
import SignInButton from "islands/SignInButton.tsx";
import IconUserCircle from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/user-circle.tsx";
import { LinkButton } from "components/index.ts";
import SideBar from "../islands/SideBar.tsx";
import BurgerMenu from "../islands/BurgerMenu.tsx";

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
        <title>copyfuse</title>
      </Head>

      <div class="bg-primary shadow-md">
        <nav class="flex items-center justify-between flex-wrap min-h-[60px] pl-8 pr-8 mx-auto">
          <a href="/">
            <div class="flex flex-shrink-0 border-white">
              <span class="ml-4 text-white font-header text-[30px]">
                <span className="font-light">copy</span>
                <span className="font-bold">fuse</span>
              </span>
            </div>
          </a>

          <div class="flex flex-grow border-gray pt-1">
            {isAllowed
              ? (
                <div class="flex flex-grow justify-end">
                  <NavLink href="/share">Share</NavLink>
                  <NavLink href="/unseal">Unseal</NavLink>
                </div>
              )
              : <div class="flex flex-grow justify-end"></div>}
            <div class="flex sm:flex-shrink-0">
              {!isAllowed
                ? <SignInButton text={buttProps.text} />
                : (
                  <LinkButton href={buttProps.href}>
                    <IconUserCircle class="text-white" />
                    {buttProps.text}
                  </LinkButton>
                )}
            </div>
          </div>
        </nav>
      </div>

      <div class="mx-auto max-w-screen-md p-4">
        <SideBar />
        <SignInDialog />
        {props.children}
      </div>
    </>
  );
}
