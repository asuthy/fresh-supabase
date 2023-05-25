import { FormButton, Input } from "components/index.ts";

export default function AuthForm() {
  return (
    <div class="items-stretch min-w-0">
      <form method="post" class="flex flex-col space-y-4 min-w-0 pt-10">
        <Input
          autofocus
          type="text"
          name="Confirmation Code"
        />

        <FormButton
          type="submit"
          formAction="/api/sign-in-code"
          class="!mt-8"
        >
          Sign In
        </FormButton>
      </form>
    </div>
  );
}
