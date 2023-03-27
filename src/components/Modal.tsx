import { useEffect } from "react";

type ModalProps = {
  showModal: boolean;
  content: React.ReactNode;
  onClose: () => void;
};

const Modal = ({ showModal, content, onClose }: ModalProps) => {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [onClose]);

  return !showModal ? null : (
    <div className="modal" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        {content}
      </div>
    </div>
  );
};

export default Modal;
