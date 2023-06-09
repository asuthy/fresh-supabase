import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

interface InputProps {
  name: string | undefined;
  displayName: string | undefined;
  value: string | number | string[] | undefined;
  valid: boolean | undefined;
  disabled: boolean | undefined;
  class: string | undefined;
  onInput: JSX.GenericEventHandler<HTMLInputElement> | undefined;
}

export function Input(props: InputProps) {
  const name = props.name || "";
  const displayName = name.charAt(0).toLocaleUpperCase() + name.slice(1);

  return (
    <label
      for={props.name}
      class={`flex flex-col flex-grow mb-1 text-sm ${
        props.valid ? "text-gray-500" : "text-red-400"
      }`}
    >
      {displayName}
      <input
        {...props}
        disabled={!IS_BROWSER || props.disabled}
        onInput={props.onInput}
        value={props.value}
        class={`px-3 py-3 rounded focus:outline-none disabled:(opacity-50 cursor-not-allowed) text-gray-500 bg-black ${
          props.class ?? ""
        } ${props.valid ? "border(gray-700 1)" : "border(red-900 1)"}`}
      />
    </label>
  );
}
