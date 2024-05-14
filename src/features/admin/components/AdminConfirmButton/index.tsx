'use client';

import { Button } from '@/components/common';
import { Check, X } from 'lucide-react';
import React from 'react';
import { approveOrder, rejectOrder } from '../../action/order';
import { toast } from 'react-toastify';

type AdminConfirmButtonProps = {
  id: string;
};

const AdminConfirmButton = ({ id }: AdminConfirmButtonProps) => {
  const handleApprove = async (id: string) => {
    try {
      await approveOrder(id);
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectOrder(id);
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        className="flex items-center gap-x-1 px-2 py-1 text-xs"
        variant="green"
        onClick={() => handleApprove(id)}
      >
        <Check size={15} /> Approve
      </Button>
      <Button
        className="flex items-center gap-x-1 px-2 py-1 text-xs"
        variant="danger"
        onClick={() => handleReject(id)}
      >
        <X size={15} /> Reject
      </Button>
    </div>
  );
};

export default AdminConfirmButton;
