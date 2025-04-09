import React, { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={`
          relative 
          bg-white 
          rounded-xl 
          w-full 
          ${sizeClasses[size]}
          max-h-[90vh] 
          overflow-y-auto 
          shadow-2xl 
          transform 
          transition-all 
          duration-300 
          scale-100 
          opacity-100
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 md:px-6 border-b border-gray-200 rounded-t-xl">
          <h2
            id="modal-title"
            className="text-xl md:text-2xl font-semibold text-gray-800 flex-grow"
          >
            {title}
          </h2>
          <button
            className="
              text-gray-500 
              hover:text-gray-700 
              focus:outline-none 
              focus:ring-2 
              focus:ring-teal-500 
              rounded-full 
              p-2 
              transition 
              duration-200
            "
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};