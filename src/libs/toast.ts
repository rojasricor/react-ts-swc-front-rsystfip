import { toast, ToastOptions } from "react-toastify";
import { TOAST_ID } from "../constants";

export function notify(content: string, options: ToastOptions) {
    options.type === "error" &&
        (options = {
            ...options,
            position: "top-center",
            closeButton: false,
        });

    toast.isActive(TOAST_ID)
        ? toast.update(TOAST_ID, { ...options, render: content })
        : toast(content, { ...options, toastId: TOAST_ID });
}
