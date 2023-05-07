import React, { useState } from 'react';
import EditData from './EditData';
import { AiFillCloseCircle } from 'react-icons/ai';

function ModalForm({ isOpen, setIsOpen, editData }) {

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 pb-20 text-center sm:block">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            ></span>
            <div
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <AiFillCloseCircle onClick={toggleModal} className='cursor-pointer absolute right-4 top-4 text-2xl hover:text-red-500'/>
              <EditData editData={editData} toggleModal={toggleModal}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModalForm;
