import React from 'react';
import { Typography } from '@mui/material';
import CommonModal from 'components/modals/commonModal';
import ModalActions from 'components/modalActions/modalActions';

interface DeleteFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteFileModal: React.FC<DeleteFileModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete File"
      size="sm"
      actions={
        <ModalActions
          onConfirm={onConfirm}
          onCancel={onClose}
          confirmText="Yes, Delete"
          cancelText="Cancel"
          confirmColor="error"
        />
      }
    >
      <Typography variant="h6">Are you sure you want to delete this file?</Typography>
    </CommonModal>
  );
};

export default DeleteFileModal;
