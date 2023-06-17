import { ToastContainer, Flip } from "react-toastify";

const Notify = (): React.JSX.Element => (
  <ToastContainer
    position="top-right"
    autoClose={2000}
    hideProgressBar={false}
    newestOnTop={false}
    transition={Flip}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
  />
);

export default Notify;
