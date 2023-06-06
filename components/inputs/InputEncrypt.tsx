import { JSX } from "preact";
import { useState } from "preact/hooks";
import { Input } from "./Input.tsx";

type OnValidChangeFunctionType = (valid: boolean) => boolean;
type OnInputChangeFunctionType = (
  value: string | undefined,
) => string | undefined;

interface InputEncryptProps extends JSX.HTMLAttributes<HTMLInputElement> {
  onValidChange: OnValidChangeFunctionType;
  onInputChange: OnInputChangeFunctionType;
}

export function InputEncrypt(props: InputEncryptProps) {
  const [valid, setValid] = useState(true);
  const name = props.name || "";
  const displayName = name.charAt(0).toLocaleUpperCase() + name.slice(1);

  const onInput = function (
    { currentTarget }: JSX.TargetedEvent<HTMLInputElement, Event>,
  ) {
    let isValid = true;

    if (currentTarget.value) {
      isValid = currentTarget.value.length > 0;
    } else {
      isValid = false;
    }

    if (props.onInputChange) {
      props.onInputChange(currentTarget.value);
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
      value={props.value}
    />
  );
}
