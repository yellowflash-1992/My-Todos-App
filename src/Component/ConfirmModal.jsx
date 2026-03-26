import React from 'react';


const ConfirmModal = ({isOpen, onConfirm, onCancel, taskName, title, message}) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full transform transition-all scale-100 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{message} </p>

        {/* <span className="font-semibold text-green-600">"{taskName}"</span> to completed? */}
        
        <div className="flex gap-3 justify-end">
          <button 
            onClick={onCancel}
            className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium shadow-md shadow-green-200 transition-all active:scale-95"
          >
            Yes, Complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;