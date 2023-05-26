import { JSX } from "preact";
import { ComponentChildren } from "preact";

interface popupProps {
  children: ComponentChildren;
  buttonText: string;
  visible: boolean;
}

export function Popup(
  props: popupProps,
) {
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
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                    <p class="text-3xl pb-3">
                      copy<b>fuse</b>
                    </p>
                    <div>
                      {props.children}
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
