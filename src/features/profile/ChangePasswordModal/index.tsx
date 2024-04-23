'use client';

import React, { useState } from 'react';
import ModalChangePassword from '../ModalChangePassword';

const ChangePasswordModal = () => {
  const [showModal, setShowModal] = useState<0 | 100>(0);

  return (
    <div>
      <div role="button" className="text-primary-dark font-semibold">
        <p>Change Password?</p>
      </div>
      <ModalChangePassword
        onShowModal={() => setShowModal(100)}
        modalValue={showModal}
      />
    </div>
  );
};

export default ChangePasswordModal;
