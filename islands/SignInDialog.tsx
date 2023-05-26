import AuthForm from "islands/AuthForm.tsx";
import { Popup } from "components/index.ts";
import { state } from "../lib/state.ts";

export default function SignInDialog() {
  const { showSignIn } = state.value;
  return (
    <>
      <div>
        <Popup visible={showSignIn} buttonText="Send">
          <div class="flex justify-center text-gray-500">
            Enter your email address below and we will send you a code to sign
            in with.
          </div>
          <AuthForm />
        </Popup>
      </div>
    </>
  );
}
