import SignInCodeForm from "islands/SignInCodeForm.tsx";
import { Modal } from "components/index.ts";

export default function SignInCodeDialog() {
  return (
    <>
      <div>
        <Modal visible={true} buttonText="Send" allowClose={false}>
          <div class="flex justify-center text-gray-500">
            We sent a confirmation code. Please enter it below to continue.
          </div>
          <SignInCodeForm />
        </Modal>
      </div>
    </>
  );
}
