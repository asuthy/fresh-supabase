import { toBase58 } from "../util/base58.ts";
import { ID_LENGTH } from "./constants.ts";

export function generateId(): string {
  const bytes = new Uint8Array(ID_LENGTH);
  crypto.getRandomValues(bytes);
  return toBase58(bytes);
}
