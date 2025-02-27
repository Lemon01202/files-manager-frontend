import React from 'react';
import CommonModal from 'components/modals/commonModal';
import ModalActions from 'components/modalActions/modalActions';

interface DeleteFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  folderName?: string;
}

const DeleteFolderModal: React.FC<DeleteFolderModalProps> = ({ isOpen, onClose, onConfirm, folderName }) => {
  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Are you sure?"
      size="sm"
      actions={
        <ModalActions
          onConfirm={onConfirm}
          onCancel={onClose}
          confirmText="Yes"
          cancelText="No"
          confirmColor="error"
        />
      }
    >
      Are you sure you want to delete the folder <b>{folderName}</b> with all files?
    </CommonModal>
  );
};

export default DeleteFolderModal;
