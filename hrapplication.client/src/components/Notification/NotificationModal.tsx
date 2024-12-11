
interface NotificationModalProps {
    isOpen: boolean; // Flaga czy modal jest otwarty
    onClose: () => void; // Funkcja zamykaj�ca modal
}
const NotificationModal: React.FC<NotificationModalProps> = ({
    isOpen,
    onClose,
}) => {

  if (!isOpen) return null;

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div
              className={"w-96 rounded-lg p-6 shadow-lg transition-all duration-500 bg-white"}
          >
              <h2 className="mb-4 text-xl font-semibold">Notification</h2>
              <p>fsd</p>
              <button
                  className="mt-4 rounded-lg bg-gray-700 px-4 py-2 text-white hover:bg-gray-800"
                  onClick={onClose} // Manualne zamkni�cie
              >
                  Close
              </button>
          </div>
      </div>
  );
}

export default NotificationModal;