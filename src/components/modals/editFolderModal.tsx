import React from 'react';
import { Box, TextField } from '@mui/material';
import { Formik, Form } from 'formik';
import CommonModal from 'components/modals/commonModal';
import ModalActions from 'components/modalActions/modalActions';
import { folderValidationSchema } from 'validation/folder';

interface EditFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (folderName: string) => void;
  initialFolderName: string;
}

const EditFolderModal: React.FC<EditFolderModalProps> = ({ isOpen, onClose, onSave, initialFolderName }) => {
  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Folder Name"
      size="sm"
      actions={<></>}
    >
      <Formik
        initialValues={{ folderName: initialFolderName }}
        validationSchema={folderValidationSchema}
        onSubmit={(values) => {
          onSave(values.folderName);
          onClose();
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched, handleSubmit }) => (
          <Form>
            <TextField
              label="Folder Name"
              name="folderName"
              value={values.folderName}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              autoFocus
              error={touched.folderName && Boolean(errors.folderName)}
              helperText={touched.folderName && errors.folderName}
            />
            <Box mt={2}>
              <ModalActions
                onConfirm={handleSubmit}
                onCancel={onClose}
                confirmText="Save"
                cancelText="Cancel"
              />
            </Box>
          </Form>
        )}
      </Formik>
    </CommonModal>
  );
};

export default EditFolderModal;
