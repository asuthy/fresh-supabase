import { useEffect, useState } from "preact/hooks";
import { Handlers, PageProps } from "$fresh/server.ts";
import { FormButton, InputEncrypt } from "components/index.ts";

import { decodeCompositeKey } from "pkg/encoding.ts";
import { decrypt } from "pkg/encryption.ts";

import IconClipboard from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/clipboard.tsx";
import IconClipboardCheck from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/clipboard-check.tsx";

export const handler: Handlers = {
  GET(_req, ctx) {
    return ctx.render(ctx.state);
  },
};

export function DecryptForm() {
  const [valid, setValid] = useState(false);
  const [compositeKey, setCompositeKey] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setValid(true);
      setCompositeKey(window.location.hash.replace(/^#/, ""));
    }
  }, []);

  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [remainingReads, setRemainingReads] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const onSubmit = async () => {
    try {
      setError(null);
      setText(null);
      setLoading(true);

      if (!compositeKey) {
        throw new Error("No id provided");
      }

      const { id, encryptionKey, version } = decodeCompositeKey(compositeKey);
      const res = await fetch(`/api/v1/load?id=${id}`);
      if (!res.ok) {
        throw new Error(await res.text());
      }
      const json = (await res.json()) as {
        iv: string;
        encrypted: string;
        remainingReads: number | null;
      };
      setRemainingReads(json.remainingReads);

      const decrypted = await decrypt(
        json.encrypted,
        encryptionKey,
        json.iv,
        version,
      );

      setText(decrypted);
    } catch (e) {
      console.error(e);
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const onValidChange = function (valid: boolean) {
    setValid(valid);
    return valid;
  };

  return (
    <div>
      {!text
        ? (
          <form
            className="flex flex-col space-y-4 min-w-0 pt-10"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <div>
              <InputEncrypt
                type="text"
                name="ID"
                id="compositeKey"
                class="w-full text-base bg-transparent border-0 appearance-none focus:ring-0 sm:text-sm !text-white"
                value={compositeKey}
                onValidChange={onValidChange}
                disabled={false}
                onInputChange={(
                  value: string | undefined,
                ) => {
                  if (value) {
                    setCompositeKey(value);
                    return;
                  }

                  return value;
                }}
              />
            </div>

            <FormButton
              type="submit"
              disabled={!valid}
              class="!mt-8"
            >
              Unseal
            </FormButton>
          </form>
        )
        : (
          <div class="pt-10">
            <pre className="px-4 py-3 font-mono text-center bg-transparent border rounded border-gray-700 focus:ring-0 sm:text-sm text-white">
              {text}
            </pre>

            <div className="flex items-center justify-end gap-4 mt-4">
              <button
                type="button"
                className="relative inline-flex items-center focus:outline-none cursor-pointer px-4 py-2 rounded border-1 hover:border-gray-700 !text-black bg-white text-center font-bold hover:bg-gray-900 hover:!text-white duration-200"
                onClick={() => {
                  navigator.clipboard.writeText(text);
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
                  : <IconClipboard className="w-5 h-5" aria-hidden="true" />}
                {" "}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>
        )}
    </div>
  );
}
