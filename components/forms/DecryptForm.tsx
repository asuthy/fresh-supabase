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
                name="Composite Key"
                id="compositeKey"
                className="w-full p-0 text-base bg-transparent border-0 appearance-none text-zinc-100 placeholder-zinc-500 focus:ring-0 sm:text-sm"
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
            >
              Unseal
            </FormButton>
          </form>
        )
        : (
          <div>
            <pre className="flex overflow-x-auto pt-10">
            <code className="px-4 text-left">{text}</code>
            </pre>

            <button
              type="button"
              className="relative inline-flex items-center px-4 py-2 -ml-px space-x-2 text-sm font-medium duration-150 border rounded text-zinc-700 border-zinc-300 bg-zinc-50 hover focus:border-zinc-500 focus:outline-none hover:text-zinc-50 hover:bg-zinc-900"
              onClick={() => {
                navigator.clipboard.writeText(text);
                setCopied(true);
              }}
            >
              {copied
                ? <IconClipboardCheck className="w-5 h-5" aria-hidden="true" />
                : <IconClipboard className="w-5 h-5" aria-hidden="true" />}{" "}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        )}
    </div>
  );
}
