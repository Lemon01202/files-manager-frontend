import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import { File } from 'types/fileTypes';
import FileItem from "components/filesList/fileItem/fileItem";
import FilePreviewModal from "components/modals/filePreviewModal";
import DeleteFileModal from "components/modals/deleteFileModal";
import ShareFileModal from "components/modals/shareFileModal";
import UploadFileModal from "components/modals/uploadFileModal";
import {fileStore} from "../../stores/fileStore";
import {folderStore} from "../../stores/folderStore";

interface FileListProps {
  files: File[];
  handleOpenUploadFileModal: (state: boolean) => void;
  onDeleteFile: (fileId: number) => void;
  onEditFile: (fileId: number, file: File, isPublic: boolean) => void;
  onShareFileAccess: (fileId: number, email: string, permission: 'view' | 'edit') => void;
  onSetFilePrivacy: (fileId: number, isPublic: boolean) => void;
}

const FilesList: React.FC<FileListProps> = React.memo(
  ({ files, onDeleteFile, onEditFile, onShareFileAccess, onSetFilePrivacy }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [fileToDelete, setFileToDelete] = useState<File | null>(null);
    const [fileToShare, setFileToShare] = useState<File | null>(null);
    const [editingFile, setEditingFile] = useState<File | null>(null);

    const backendUrl = process.env.REACT_APP_BACKEND_URL || '';

    const handleSaveEdit = (fileId: number, fileName: string, isPublic: boolean) => {
      const updatedFile = files.find((file) => file.id === fileId);
      if (updatedFile) {
        onEditFile(fileId, { ...updatedFile, fileName, isPublic }, isPublic);
      }
      setEditingFile(null);
    };

    const handleCancelEdit = () => {
      setEditingFile(null);
    };

    const handleEditFile = React.useCallback((fileId: number, file: any, isPublic: boolean) => {
      fileStore.updateFile(fileId, file, { isPublic });
    }, []);

    const handleOpenUploadFileModal = React.useCallback((state: boolean) => {
      fileStore.setUploadFileModalOpen(state);
    }, []);

    const handleUploadFile = async (file: any, isPublic: boolean = false) => {
      await fileStore.uploadFile(file, isPublic, folderStore.currentFolderId);
      handleOpenUploadFileModal(false);
    };

    return (
      <Box my={2}>
        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="h6">Files</Typography>
          <IconButton color="primary" onClick={() => handleOpenUploadFileModal(true)}>
            <Add />
          </IconButton>
        </Box>
        {files.length > 0 ? (
          <Box display="flex" flexWrap="wrap" gap={2}>
            {files.map((file) => (
              <Box key={file.id} flex="1 1 calc(25% - 16px)" maxWidth="300px" minWidth="200px">
                <FileItem
                  file={file}
                  onDelete={(fileId) => {
                    setFileToDelete(file);
                    setIsDeleteModalOpen(true);
                  }}
                  onSaveEdit={handleSaveEdit}
                  onShare={(file) => {
                    setFileToShare(file);
                    setIsShareModalOpen(true);
                  }}
                  onSetPrivacy={onSetFilePrivacy}
                  onPreview={(file) => {
                    setSelectedFile(file);
                    setIsPreviewModalOpen(true);
                  }}
                  backendUrl={backendUrl}
                  isEditing={editingFile?.id === file.id}
                  onCancelEdit={handleCancelEdit}
                  onStartEdit={() => setEditingFile(file)}
                />
              </Box>
            ))}
          </Box>
        ) : (
          <Typography>No files available</Typography>
        )}

        <FilePreviewModal
          isOpen={isPreviewModalOpen}
          onClose={() => setIsPreviewModalOpen(false)}
          file={selectedFile}
          backendUrl={backendUrl}
        />

        <DeleteFileModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            if (fileToDelete) onDeleteFile(fileToDelete.id);
            setIsDeleteModalOpen(false);
          }}
        />

        <ShareFileModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          onConfirm={(email, permission) => {
            if (fileToShare) onShareFileAccess(fileToShare.id, email, permission);
            setIsShareModalOpen(false);
          }}
        />

        <UploadFileModal
          isUploadFileModalOpen={fileStore.isUploadFileModalOpen || editingFile !== null}
          handleOpenUploadFileModal={(state) => {
            if (!state) {
              setEditingFile(null);
            }
            handleOpenUploadFileModal(state);
          }}
          handleUploadFile={(file, isPublic) => {
            if (editingFile) {
              handleEditFile(editingFile.id, file, isPublic);
            } else {
              handleUploadFile(file, isPublic);
            }
          }}
          initialFile={editingFile}
          isEditMode={editingFile !== null}
        />
      </Box>
    );
  },
);

export default FilesList;
