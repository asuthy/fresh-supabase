import { useState } from "preact/hooks";
import { FormButton, InputConfirmationCode } from "components/index.ts";

export function SignInCodeForm() {
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
          disabled={false}
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
