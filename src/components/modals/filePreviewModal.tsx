import React from 'react';
import { Box } from '@mui/material';
import CommonModal from 'components/modals/commonModal';

interface FilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: {
    mimeType: string;
    filePath: string;
    fileName: string;
  } | null;
  backendUrl: string;
}

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({ isOpen, onClose, file, backendUrl }) => {
  return (
    <CommonModal isOpen={isOpen} onClose={onClose} title="File Preview" size="md">
      {file && (
        <>
          {file.mimeType.startsWith('image/') && (
            <img
              src={`${backendUrl}/${file.filePath}`}
              alt={file.fileName}
              style={{ width: '100%', height: 'auto' }}
            />
          )}
          {file.mimeType.startsWith('video/') && (
            <video controls style={{ width: '100%', height: 'auto' }}>
              <source src={`${backendUrl}/${file.filePath}`} type={file.mimeType} />
            </video>
          )}
        </>
      )}
    </CommonModal>
  );
};

export default FilePreviewModal;
