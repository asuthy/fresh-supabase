import { useState } from "preact/hooks";
import { FormButton, InputEmail } from "components/index.ts";

export default function AuthForm() {
  const [valid, setValid] = useState(false);

  const onValidChange = function (valid: boolean) {
    setValid(valid);
    return valid;
  };

  return (
    <div class="items-stretch min-w-0">
      <form method="post" class="flex flex-col space-y-4 min-w-0 pt-4">
        <InputEmail
          autofocus
          type="email"
          name="email Address *"
          onValidChange={onValidChange}
        />

        <FormButton
          type="submit"
          formAction="/api/sign-in"
          class="!mt-8"
          disabled={!valid}
        >
          Send
        </FormButton>
      </form>
    </div>
  );
}
