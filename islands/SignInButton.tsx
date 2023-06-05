import { LinkButton } from "components/index.ts";
import IconUserCircle from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/user-circle.tsx";
import { state } from "lib/state.ts";

interface Props {
  text?: string;
}

export default function SignInButton(props: Props) {
  const onButtonClick = function (event: MouseEvent) {
    const currentState = state.value;
    state.value = { ...currentState, showSignIn: true };
  };

  return (
    <>
      <LinkButton onClick={onButtonClick}>
        <IconUserCircle class="text-white" />
        {props.text}
      </LinkButton>
    </>
  );
}
