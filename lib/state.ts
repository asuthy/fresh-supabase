import { signal } from "@preact/signals";

interface State {
  showSignIn: boolean;
  testVar: boolean;
}

export const state = signal<State>({ showSignIn: false, testVar: false });
