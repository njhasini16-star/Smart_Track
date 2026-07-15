function Toast({toast}) {
    if (!toast) {
        return null;
    }
    const {message, type} = toast;

    const styles = {
        success: "bg-green-100 text-green-800 border-green-300",
        error: "bg-red-100 text-red-800 border-red-300",
        info: "bg-blue-100 text-blue-800 border-blue-300"
    }
    return (
        <div className={`px-4 py-3 rounded-xl shadow-xl border fixed w-fit h-fit right-0 top-13 ${styles[type]} transition-all duration-300 ${toast.visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}>
            {message}
        </div>
    )
}

export default Toast;