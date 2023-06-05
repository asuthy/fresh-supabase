import { useState } from "preact/hooks";
import { FormButton, InputEncrypt } from "components/index.ts";

export function EncryptForm() {
  const [valid, setValid] = useState(false);

  const onValidChange = function (valid: boolean) {
    setValid(valid);
    return valid;
  };

  return (
    <div class="items-stretch min-w-0">
      <form method="post" class="flex flex-col space-y-4 min-w-0 pt-10">
        <InputEncrypt
          autofocus
          type="text"
          name="Value"
          onValidChange={onValidChange}
          disabled={false}
        />

        <FormButton
          type="submit"
          formAction="/api/encrypt"
          class="!mt-8"
          disabled={!valid}
        >
          Share
        </FormButton>
      </form>
    </div>
  );
}
