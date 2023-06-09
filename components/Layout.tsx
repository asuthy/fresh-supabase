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
        <title>copyshare</title>
      </Head>

      <body className="relative min-h-screen bg-black">
        <div class="max-h-screen">
          <div class="bg-primary shadow-md h-screen">
            <nav class="flex items-center justify-between flex-wrap min-h-[60px] pl-8 pr-8 mx-auto">
              <a href="/">
                <div class="flex flex-shrink-0 border-white">
                  <span class="ml-4 text-white font-header text-[30px]">
                    <span className="font-light">copy</span>
                    <span className="font-bold">share</span>
                  </span>
                </div>
              </a>

              <div class="flex flex-grow border-gray pt-1">
                <div class="flex flex-grow justify-end">
                  {isAllowed
                    ? <NavLink href="/share">Share</NavLink>
                    : <div class="flex flex-grow justify-end"></div>}
                  <NavLink href="/unseal">Unseal</NavLink>
                </div>
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
            <div class="bg-primary h-full flex flex-col items-center justify-center ">
              <div class="mx-auto max-w-screen-md min-h-[80vh]">
                <SideBar />
                <SignInDialog />
                {props.children}
              </div>

              <footer className="bottom-0 border-t inset-2x-0 border-gray-800 w-full min-h-[50px]">
                <div className="flex flex-col gap-1 px-6 py-2 mx-auto text-xs text-center max-w-7xl lg:px-8 text-gray-600">
                  <p>
                    Built by @asuthy
                  </p>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </body>
    </>
  );
}
