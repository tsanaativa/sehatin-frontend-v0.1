'use client';

import React, { useState } from 'react';
import ModalChangePassword from '../ModalChangePassword';

const UpdateAddressModal = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div>
      <div
        role="button"
        className="text-primary-dark font-semibold"
        onClick={() => setShowModal(true)}
      >
        <p>Change Password?</p>
      </div>
      <ModalChangePassword onShowModal={setShowModal} showModal={showModal} />
    </div>
  );
};

export default UpdateAddressModal;
