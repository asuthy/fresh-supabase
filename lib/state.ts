import { signal } from "@preact/signals";

interface State {
  showSignIn: boolean;
  showSideBar: boolean;
}

export const state = signal<State>({ showSignIn: false, showSideBar: false });
