import { ToastContainer, Zoom, toast } from "react-toastify";

export default function Notify(): React.JSX.Element {
    return (
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
}
