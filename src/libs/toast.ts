import { toast, ToastOptions } from "react-toastify";

export const showAndUpdateToast = (content: string, options: ToastOptions) => {
    toast(content, options);
};
