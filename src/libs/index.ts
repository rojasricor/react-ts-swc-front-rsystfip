import { toast, Id as ToastId, ToastOptions } from "react-toastify";
import { TOAST_ID } from "../constants";

export const showAndUpdateToast = (
    errors: string | string[],
    setMyToast?: (toastId: ToastId) => void,
    options?: ToastOptions
) => {
    let errorMessages: typeof errors;
    let errorMessagesText = "";

    if (typeof errors === "string") {
        errorMessagesText = errors;
    } else if (typeof errors === "object") {
        errorMessages = Object.values(errors).flat() as string[];
        errorMessagesText = errorMessages.join(", ") as string;
    } else return;

    if (toast.isActive(TOAST_ID))
        return toast.update(TOAST_ID, { render: errorMessagesText });

    if (setMyToast === undefined) {
        toast.warn(errorMessagesText, { toastId: TOAST_ID });
        return;
    }

    setMyToast(toast.warn(errorMessagesText, { toastId: TOAST_ID }));
};
