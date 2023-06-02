import { JSX } from "preact";
import { useState } from "preact/hooks";
import { Input } from "./Input.tsx";

type OnValidChangeFunctionType = (valid: boolean) => boolean;

interface InputConfirmationCodeProps
  extends JSX.HTMLAttributes<HTMLInputElement> {
  onValidChange: OnValidChangeFunctionType;
}

export function InputConfirmationCode(props: InputConfirmationCodeProps) {
  const [valid, setValid] = useState(true);
  const name = props.name || "";
  const displayName = name.charAt(0).toLocaleUpperCase() + name.slice(1);

  const onInput = function (
    { currentTarget }: JSX.TargetedEvent<HTMLInputElement, Event>,
  ) {
    let isValid = true;

    if (currentTarget.value) {
      isValid = currentTarget.value.length === 6;
    }

    setValid(isValid);
    props.onValidChange(isValid);
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
