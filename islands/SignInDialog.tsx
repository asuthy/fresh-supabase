import { Modal, SignInForm } from "components/index.ts";
import { state } from "../lib/state.ts";

const onClose = function () {
  const currentState = state.value;
  state.value = { ...currentState, showSignIn: false };
  return true;
};

export default function SignInDialog() {
  const { showSignIn } = state.value;
  return (
    <>
      <div>
        <Modal
          visible={showSignIn}
          buttonText="Send"
          allowClose={true}
          onClose={onClose}
        >
          <div class="flex justify-center text-gray-500">
            Enter your email address below and we will send you a code to sign
            in with.
          </div>
          <SignInForm />
        </Modal>
      </div>
    </>
  );
}
