import { useState } from "preact/hooks";
import { FormButton, Input } from "components/index.ts";
import { InputConfirmationCode } from "../components/InputConfirmationCode.tsx";

export default function SignInCodeForm() {
  const [valid, setValid] = useState(false);

  const onValidChange = function (valid: boolean) {
    setValid(valid);
    return valid;
  };

  return (
    <div class="items-stretch min-w-0">
      <form method="post" class="flex flex-col space-y-4 min-w-0 pt-10">
        <InputConfirmationCode
          autofocus
          type="text"
          name="Confirmation Code"
          onValidChange={onValidChange}
        />

        <FormButton
          type="submit"
          formAction="/api/sign-in-code"
          class="!mt-8"
          disabled={!valid}
        >
          Sign In
        </FormButton>
      </form>
    </div>
  );
}
