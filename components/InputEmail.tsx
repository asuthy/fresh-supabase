import { JSX } from "preact";
import { isEmail } from "@emsifa/validasaur";
import { useState } from "preact/hooks";
import { Input } from "./Input.tsx";

export function InputEmail(props: JSX.HTMLAttributes<HTMLInputElement>) {
  const [valid, setValid] = useState(true);
  const name = props.name || "";
  const displayName = name.charAt(0).toLocaleUpperCase() + name.slice(1);

  const onInput = function (
    { currentTarget }: JSX.TargetedEvent<HTMLInputElement, Event>,
  ) {
    if (currentTarget.value) {
      setValid(!isEmail(currentTarget.value));
    } else {
      setValid(true);
    }
  };

  return (
    <Input
      name={props.name}
      displayName={displayName}
      disabled={props.disabled}
      valid={valid}
      class={props.class}
      onInput={onInput}
    />
  );
}
