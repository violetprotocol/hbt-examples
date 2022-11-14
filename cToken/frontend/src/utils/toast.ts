import { toast } from "react-toastify";

export const displayToast = (message: string, options?: any) =>
  toast(message, {
    type: "info",
    autoClose: 3000,
    position: "top-center",
    style: {
      width: 520,
    },
    theme: "colored",
    ...options,
  });
