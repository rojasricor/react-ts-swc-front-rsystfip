import { ToastContainer, toast, Zoom } from "react-toastify";

const Notify = (): React.JSX.Element => (
  <ToastContainer
    position={toast.POSITION.TOP_RIGHT}
    autoClose={false}
    hideProgressBar
    newestOnTop
    transition={Zoom}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss={false}
    draggable={false}
    pauseOnHover={false}
    limit={2}
    theme="colored"
  />
);

export default Notify;
