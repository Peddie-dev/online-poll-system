import React from 'react';
import { useRouter } from 'next/router';

interface VoteSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoteSuccessModal: React.FC<VoteSuccessModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleOkay = () => {
    onClose(); // close modal
    router.push('/'); // redirect to home page
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center shadow-lg">
        <h2 className="text-xl font-bold mb-2">Vote Submitted Successfully</h2>
        <p className="mb-4">Thanks for participating - results have been updated.</p>
        <button
          onClick={handleOkay}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Okay
        </button>
      </div>
    </div>
  );
};

export default VoteSuccessModal;
