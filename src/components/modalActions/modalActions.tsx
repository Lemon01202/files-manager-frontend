import React from 'react';
import { Box, Button } from '@mui/material';

interface ModalActionsProps {
  onConfirm: () => void;
  onCancel: () => void;
  confirmText: string;
  cancelText: string;
  confirmColor?: 'primary' | 'error';
}

const ModalActions: React.FC<ModalActionsProps> = ({
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
  confirmColor = 'primary',
}) => {
  return (
    <Box display="flex" justifyContent="flex-end" gap={2}>
      <Button variant="contained" color={confirmColor} onClick={onConfirm}>
        {confirmText}
      </Button>
      <Button variant="outlined" onClick={onCancel}>
        {cancelText}
      </Button>
    </Box>
  );
};

export default ModalActions;
