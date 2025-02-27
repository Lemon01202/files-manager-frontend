import React from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const sizeToWidth = {
  xs: '300px',
  sm: '400px',
  md: '500px',
  lg: '600px',
  xl: '800px',
};

const CommonModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
  size = 'md',
}) => {
  const modalWidth = sizeToWidth[size];

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: modalWidth,
          maxWidth: '90%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
          textAlign: 'center',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <Typography id="modal-title" variant="h6" mb={2}>
            {title}
          </Typography>
        )}
        <Box id="modal-description" mb={2}>
          {children}
        </Box>
        {actions || (
          <Button variant="contained" color="primary" onClick={onClose}>
            Close
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default CommonModal;
