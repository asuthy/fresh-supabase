import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useState } from "preact/hooks";

export function FormButton(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  const [disabled, setDisabled] = useState(false);

  const buttonClick = function () {
    setDisabled(true);
  };

  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled || disabled}
      onClick={buttonClick}
      class={`flex-grow focus:outline-none inline-block cursor-pointer px-4 py-2 rounded disabled:(opacity-50 cursor-not-allowed) bg-primary border-primary text-white hover:bg-primaryStrong hover:border-primaryStrong ${
        props.class ?? ""
      }`}
    />
  );
}
