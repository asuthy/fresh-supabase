import { JSX } from "preact";
import { Button } from "components/index.ts";

export function NavButton(props: JSX.HTMLAttributes<HTMLAnchorElement>) {
  return (
    <Button
      {...props}
      class={`rounded border-1 hover:border-gray-700 !text-black bg-white w-60 text-center font-bold hover:bg-gray-900 hover:!text-white duration-200 ${
        props.class ?? ""
      }`}
    />
  );
}
