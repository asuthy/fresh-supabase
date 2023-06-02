import { ComponentChildren } from "preact";
import { LinkButton } from "components/index.ts";

type OnCloseFunctionType = () => boolean;

interface ModalProps {
  children: ComponentChildren;
  buttonText: string;
  visible: boolean;
  allowClose: boolean;
  onClose?: OnCloseFunctionType;
}

export function Modal(
  props: ModalProps,
) {
  const onClose = function (event: MouseEvent) {
    if (props.onClose) {
      props.onClose();
    }
  };

  return (
    <>
      <div
        class="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        {props.visible
          ? (
            <div>
              <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
              </div>

              <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
                  <div class="relative transform overflow-hidden rounded-lg bg-white text-right shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm">
                    {props.allowClose
                      ? (
                        <LinkButton
                          class="!text-gray-400 !text-xl pr-4"
                          onClick={onClose}
                        >
                          x
                        </LinkButton>
                      )
                      : <div class="pt-6" />}
                    <div class="text-left pl-6 pr-6 pb-6">
                      <p class="text-5xl pb-8 text-center">
                        copy<b>fuse</b>
                      </p>
                      <div>
                        {props.children}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
          : <div></div>}
      </div>
    </>
  );
}
