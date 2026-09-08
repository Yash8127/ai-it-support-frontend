function Toast({ toast, onClose }) {
  if (!toast) {
    return null;
  }

  const isSuccess =
    toast.type === "success";

  const isError =
    toast.type === "error";

  return (
    <div
      className={`toast toast-${toast.type}`}
      role="alert"
    >
      <div className="toast-icon">
        {isSuccess
          ? "✓"
          : isError
          ? "!"
          : "i"}
      </div>

      <div className="toast-content">
        <strong>
          {isSuccess
            ? "Success"
            : isError
            ? "Error"
            : "Information"}
        </strong>

        <span>
          {toast.message}
        </span>
      </div>

      <button
        className="toast-close"
        onClick={onClose}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}

export default Toast;