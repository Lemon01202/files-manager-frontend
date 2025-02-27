import React, { FC, useCallback, useState } from 'react';
import { Formik, Form } from 'formik';
import {
  Box,
  FormControl,
  FormHelperText,
  Input,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CommonModal from 'components/modals/commonModal';
import ModalActions from 'components/modalActions/modalActions';
import { uploadFileValidationSchema } from '../../validation/uploadFile';

interface UploadFileModalProps {
  isUploadFileModalOpen: boolean;
  handleOpenUploadFileModal: (state: boolean) => void;
  handleUploadFile: (file: File | null, isPublic: boolean, fileId?: number) => void;
  initialFile?: {
    id: number;
    fileName: string;
    filePath: string;
    isPublic: boolean;
    mimeType: string;
  };
  isEditMode?: boolean;
}

const UploadFileModal: FC<UploadFileModalProps> = ({
  isUploadFileModalOpen,
  handleOpenUploadFileModal,
  handleUploadFile,
  initialFile,
  isEditMode = false,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(initialFile?.mimeType || null);

  const handleCloseUploadFileModal = useCallback(() => {
    handleOpenUploadFileModal(false);
    setPreview(null);
    setFileType(null);
  }, [handleOpenUploadFileModal]);

  const handleFileChange = (file: File | null) => {
    if (file) {
      setFileType(file.type);
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        setPreview(URL.createObjectURL(file));
      } else {
        setPreview(null);
      }
    } else {
      setPreview(null);
      setFileType(initialFile?.mimeType || null);
    }
  };

  const validationSchema = isEditMode
    ? uploadFileValidationSchema.omit(['file'])
    : uploadFileValidationSchema;

  return (
    <CommonModal
      isOpen={isUploadFileModalOpen}
      onClose={handleCloseUploadFileModal}
      title={isEditMode ? 'Edit File' : 'Upload File'}
      actions={<></>}
    >
      <Formik
        initialValues={{
          file: null,
          isPublic: initialFile?.isPublic || false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          if (isEditMode) {
            handleUploadFile(values.file, values.isPublic, initialFile?.id);
          } else if (values.file) {
            handleUploadFile(values.file, values.isPublic);
          }
          resetForm();
          handleCloseUploadFileModal();
        }}
      >
        {({ setFieldValue, values, errors, touched, handleSubmit }) => (
          <Form>
            <FormControl fullWidth>
              <Box
                sx={{
                  border: '2px dashed #ccc',
                  padding: 2,
                  textAlign: 'center',
                  cursor: 'pointer',
                  position: 'relative',
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files.length > 0) {
                    const file = e.dataTransfer.files[0];
                    setFieldValue('file', file);
                    handleFileChange(file);
                  }
                }}
              >
                <Typography variant="body2" mb={1}>
                  {isEditMode ? 'Replace file (optional)' : 'Drop files to upload'}
                </Typography>

                <label htmlFor="file-upload">
                  <Button variant="contained" component="span">
                    Choose File
                  </Button>
                </label>

                <Input
                  id="file-upload"
                  type="file"
                  sx={{ display: 'none' }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const file = event.target.files?.[0] || null;
                    setFieldValue('file', file);
                    handleFileChange(file);
                  }}
                />

                {preview && fileType?.startsWith('image/') && (
                  <Box mt={2} display="flex" justifyContent="center">
                    <img
                      src={preview}
                      alt="Preview"
                      style={{ maxWidth: '100%', maxHeight: 150, borderRadius: 8 }}
                    />
                  </Box>
                )}

                {preview && fileType?.startsWith('video/') && (
                  <Box mt={2} display="flex" justifyContent="center">
                    <video
                      src={preview}
                      controls
                      style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }}
                    />
                  </Box>
                )}

                {isEditMode && !preview && initialFile && (
                  <Box mt={2} display="flex" alignItems="center" justifyContent="center">
                    {initialFile.mimeType.startsWith('image/') ? (
                      <img
                        src={`${process.env.REACT_APP_BACKEND_URL}/${initialFile.filePath}`}
                        alt={initialFile.fileName}
                        style={{ maxWidth: '100%', maxHeight: 150, borderRadius: 8 }}
                      />
                    ) : initialFile.mimeType.startsWith('video/') ? (
                      <video
                        src={`${process.env.REACT_APP_BACKEND_URL}/${initialFile.filePath}`}
                        controls
                        style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }}
                      />
                    ) : initialFile.mimeType === 'application/pdf' ? (
                      <>
                        <PictureAsPdfIcon fontSize="large" color="error" />
                        <Typography variant="body2" ml={1}>{initialFile.fileName}</Typography>
                      </>
                    ) : (
                      <>
                        <InsertDriveFileIcon fontSize="large" />
                        <Typography variant="body2" ml={1}>{initialFile.fileName}</Typography>
                      </>
                    )}
                  </Box>
                )}

                {!preview && values.file && fileType && !fileType.startsWith('image/') && !fileType.startsWith('video/') && fileType !== 'application/pdf' && (
                  <Box mt={2} display="flex" alignItems="center" justifyContent="center">
                    <InsertDriveFileIcon fontSize="large" />
                    <Typography variant="body2" ml={1}>{values.file.name}</Typography>
                  </Box>
                )}
              </Box>

              <FormHelperText error>
                {touched.file && typeof errors.file === 'string' ? errors.file : ' '}
              </FormHelperText>
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  checked={values.isPublic}
                  onChange={(e) => setFieldValue('isPublic', e.target.checked)}
                  color="primary"
                />
              }
              label="Is public"
            />

            <ModalActions
              onConfirm={handleSubmit}
              onCancel={handleCloseUploadFileModal}
              confirmText={isEditMode ? 'Save' : 'Upload'}
              cancelText="Cancel"
            />
          </Form>
        )}
      </Formik>
    </CommonModal>
  );
};

export default UploadFileModal;
