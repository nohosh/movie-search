import { useEffect } from "react";

type Props = {
  showSnackbar: boolean;
  message: string;
  onClose: () => void;
};
const Snackbar: React.FC<Props> = ({ showSnackbar, message, onClose }) => {
  useEffect(() => {
    let timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  });

  return !showSnackbar ? null : (
    <div
      className="snackbar"
      onClick={(e) => e.stopPropagation()}
    >
      {message}
    </div>
  );
};

export default Snackbar;
