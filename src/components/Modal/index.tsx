import { FaTimes } from "react-icons/fa"; // Lucide React for close icon
import ModalType from "@/components/Modal/types";

function Modal({
  open,
  onClose,
  title,
  content,
  onNext,
  secondaryText,
  nextButtonText = "Next",
  cancelButtonText = "Cancel",
  load,
  maxWidth,
}: ModalType) {
  if (!open) return null; // Hide modal when not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        style={{
          width:
            maxWidth === `xs`
              ? "40vw"
              : maxWidth === `sm`
              ? `50vw`
              : maxWidth === `md`
              ? `60vw`
              : maxWidth === `lg`
              ? `70vw`
              : maxWidth === `xl`
              ? `80vw`
              : `100%`,
        }}
        className={`bg-gray-100 rounded-lg shadow-lg max-h-[90vh] w-full p-6`}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-500">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {secondaryText && (
          <p className="text-sm text-gray-400 mt-2">{secondaryText}</p>
        )}
        <div className="mt-4 overflow-y-auto max-h-[50vh]">{content}</div>

        {/* Actions */}
        <div className="flex gap-2 mt-6">
          <button
            onClick={onClose}
            className="w-full border border-gray-300 text-gray-600 rounded-lg py-2 hover:bg-gray-100"
          >
            {cancelButtonText}
          </button>
          {onNext ? (
            <button
              onClick={onNext}
              className="w-full bg-blue-600 text-white rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
            >
              {nextButtonText}
              {load && (
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" />
              )}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Modal;
