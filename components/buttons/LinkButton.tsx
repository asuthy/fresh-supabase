import { JSX } from "preact";

export function LinkButton(
  props: JSX.HTMLAttributes<HTMLAnchorElement>,
) {
  return (
    <a
      {...props}
      class={`inline-flex items-center gap-x-1.5 rounded-md px-2.5 py-1.5 text-sm text-white cursor-pointer ${
        props.class ?? ""
      }`}
    />
  );
}
