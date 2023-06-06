import { useState } from "preact/hooks";
import { FormButton, InputEncrypt } from "components/index.ts";
import { encrypt } from "pkg/encryption.ts";
import { toBase58 } from "util/base58.ts";
import { encodeCompositeKey } from "pkg/encoding.ts";
import { LATEST_KEY_VERSION } from "pkg/constants.ts";
import IconClipboard from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/clipboard.tsx";
import IconClipboardCheck from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/clipboard-check.tsx";

export function EncryptForm() {
  const [valid, setValid] = useState(false);
  const [text, setText] = useState("");
  const [reads, setReads] = useState(999);

  const [ttl, setTtl] = useState(7);
  const [ttlMultiplier, setTtlMultiplier] = useState(60 * 60 * 24);

  const [copied, setCopied] = useState(false);
  const [link, setLink] = useState("");

  const onValidChange = function (valid: boolean) {
    setValid(valid);
    return valid;
  };

  const onSubmit = async () => {
    const { encrypted, iv, key } = await encrypt(text);

    const { id } = (await fetch("/api/v1/store", {
      method: "POST",
      body: JSON.stringify({
        ttl: ttl * ttlMultiplier,
        reads,
        encrypted: toBase58(encrypted),
        iv: toBase58(iv),
      }),
    }).then((r) => r.json())) as { id: string };

    const compositeKey = encodeCompositeKey(LATEST_KEY_VERSION, id, key);

    const url = new URL(window.location.href);
    url.pathname = "/unseal";
    url.hash = compositeKey;

    setLink(url.toString());
  };

  return (
    <div class="items-stretch min-w-0">
      {!link
        ? (
          <div>
            <div class="text-gray-400 text-4xl items-center justify-center">
              <h1 class="font-header font-semibold w-full text-center">
                Encrypt and Share
              </h1>
            </div>
            <form
              method="post"
              class="flex flex-col space-y-4 min-w-0 pt-10"
              onSubmit={(e) => {
                e.preventDefault();

                onSubmit();
              }}
            >
              <InputEncrypt
                autofocus
                type="text"
                name="Value"
                onValidChange={onValidChange}
                disabled={false}
                onInputChange={(
                  value: string | undefined,
                ) => {
                  if (value) {
                    setText(value);
                    return;
                  }

                  return value;
                }}
              />

              <FormButton
                type="submit"
                formAction="/api/encrypt"
                class="!mt-8"
                disabled={!valid}
              >
                Share
              </FormButton>
            </form>
          </div>
        )
        : (
          <div className="flex flex-col items-center justify-center w-full h-full pt-10">
            <div class="text-gray-400 text-4xl items-center justify-center">
              <h1 class="font-header font-semibold w-full text-center">
                Share this link with others
              </h1>
            </div>
            <div className="relative flex items-stretch flex-grow focus-within:z-10 pt-10">
              <pre className="px-4 py-3 font-mono text-center bg-transparent border rounded border-gray-700 focus:ring-0 sm:text-sm text-white">
              {link}
              </pre>
              <button
                type="button"
                className="relative inline-flex items-center px-4 py-2 -ml-px space-x-2 text-sm font-medium duration-150 border text-black border-gray-700 rounded-r-md bg-white hover focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 hover:text-zinc-900 hover:bg-white"
                onClick={() => {
                  navigator.clipboard.writeText(link);
                  setCopied(true);
                }}
              >
                {copied
                  ? (
                    <IconClipboardCheck
                      className="w-5 h-5"
                      aria-hidden="true"
                    />
                  )
                  : (
                    <IconClipboard
                      className="w-5 h-5"
                      aria-hidden="true"
                    />
                  )} <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>
        )}
    </div>
  );
}
