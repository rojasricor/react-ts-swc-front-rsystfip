import { toast, Id as ToastId } from "react-toastify";
import { TOAST_ID } from "../constants";

export const showAndUpdateToast: (
  errors: string[],
  setMyToast?: ((toastId: ToastId) => void) | undefined
) => void = (
  errors: string[],
  setMyToast: ((toastId: ToastId) => void) | undefined = undefined
): void => {
  const errorMessages: string[] = Object.values(errors).flat() as string[];
  const errorMessagesText: string = errorMessages.join(", ");

  if (toast.isActive(TOAST_ID)) {
    toast.update(TOAST_ID, {
      render: errorMessagesText,
      autoClose: errorMessages.length * 3000,
    });
    return;
  }

  if (setMyToast === undefined) {
    toast.warn(errorMessagesText, {
      autoClose: errorMessages.length * 3000,
      toastId: TOAST_ID,
    });
    return;
  }

  return setMyToast(
    toast.warn(errorMessagesText, {
      autoClose: errorMessages.length * 3000,
      toastId: TOAST_ID,
    })
  );
};
