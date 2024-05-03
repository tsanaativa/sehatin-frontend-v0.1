'use client';

import React, { useState } from 'react';
import ModalChangePassword from '../ModalChangePassword';

const ChangePasswordButton = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div>
      <div
        role="button"
        className="text-dark-gray font-semibold hover:underline"
        onClick={() => setShowModal(true)}
      >
        <p>Change Password?</p>
      </div>
      <ModalChangePassword onShowModal={setShowModal} showModal={showModal} />
    </div>
  );
};

export default ChangePasswordButton;
