import IconMenu2 from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/menu-2.tsx";
import { state } from "lib/state.ts";

export default function BurgerMenu() {
  const onBurgerClick = function (event: MouseEvent) {
    const currentState = state.value;
    state.value = { ...currentState, showSideBar: true };
  };

  return (
    <>
      <IconMenu2
        class="cursor-pointer text-white pt-1"
        onClick={onBurgerClick}
      />
    </>
  );
}
