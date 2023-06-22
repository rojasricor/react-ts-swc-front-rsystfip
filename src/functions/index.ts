import { toast, Id as ToastId } from "react-toastify";

export const showAndUpdateToast: (
  errors: string[],
  setMyToast?: ((toastId: ToastId) => void) | undefined
) => void = (
  errors: string[],
  setMyToast: ((toastId: ToastId) => void) | undefined = undefined
): void => {
  const errorMessages: string[] = Object.values(errors).flat() as string[];
  const errorMessagesText: string = errorMessages.join(", ");

  if (toast.isActive("toast-warn-errors-api")) {
    toast.update("toast-warn-errors-api", {
      render: errorMessagesText,
      autoClose: errorMessages.length * 3000,
    });
    return;
  }

  if (setMyToast === undefined) {
    toast.warn(errorMessagesText, {
      autoClose: errorMessages.length * 3000,
      toastId: "toast-warn-errors-api",
    });
    return;
  }

  return setMyToast(
    toast.warn(errorMessagesText, {
      autoClose: errorMessages.length * 3000,
      toastId: "toast-warn-errors-api",
    })
  );
};
