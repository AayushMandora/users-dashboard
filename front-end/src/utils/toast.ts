// build reusable custom toast in react-toastify
import { toast, ToastPosition } from "react-toastify";

const toastOptions = {
  // toast options
  position: "top-center" as ToastPosition,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const showToast = (message: string, type: string) => {
  // function to show toast
  switch (type) {
    case "success":
      toast.success(message, toastOptions);
      break;
    case "error":
      toast.error(message, toastOptions);
      break;
    case "warning":
      toast.warning(message, toastOptions);
      break;
    default:
      toast.info(message, toastOptions);
      break;
  }
};

export default showToast;
