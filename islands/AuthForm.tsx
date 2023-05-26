import { FormButton, Input } from "components/index.ts";

export default function AuthForm() {
  return (
    <div class="items-stretch min-w-0">
      <form method="post" class="flex flex-col space-y-4 min-w-0 pt-4">
        <Input
          autofocus
          type="email"
          name="email"
        />

        <FormButton
          type="submit"
          formAction="/api/sign-in"
          class="!mt-8"
        >
          Send
        </FormButton>
      </form>
    </div>
  );
}
