import React, { FC } from 'react';
import {FormControl, FormHelperText, TextField} from '@mui/material';
import { Formik, Form } from 'formik';
import CommonModal from 'components/modals/commonModal';
import ModalActions from 'components/modalActions/modalActions';
import {folderValidationSchema} from "../../validation/folder";

interface CreateEditFolderModalProps {
  isCreateFolderModalOpen: boolean;
  handleOpenCreateFolderModal: (state: boolean) => void;
  handleSaveFolder: (newFolderName: string) => void;
}

const CreateEditFolderModal: FC<CreateEditFolderModalProps> = ({
  isCreateFolderModalOpen,
  handleOpenCreateFolderModal,
  handleSaveFolder,
}) => {
  const handleCloseCreateFolderModal = () => {
    handleOpenCreateFolderModal(false);
  };

  return (
    <CommonModal
      isOpen={isCreateFolderModalOpen}
      onClose={handleCloseCreateFolderModal}
      title="Create Folder"
      actions={<></>}
    >
      <Formik
        initialValues={{ folderName: '' }}
        validationSchema={folderValidationSchema}
        onSubmit={(values, { resetForm }) => {
          handleSaveFolder(values.folderName);
          resetForm();
          handleCloseCreateFolderModal();
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched, handleSubmit }) => (
          <Form>
            <FormControl fullWidth>
              <TextField
                label="Folder Name"
                variant="outlined"
                fullWidth
                name="folderName"
                value={values.folderName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.folderName && Boolean(errors.folderName)}
                autoFocus
              />
              <FormHelperText error style={{ minHeight: '20px' }}>
                {touched.folderName && errors.folderName ? errors.folderName : ' '}
              </FormHelperText>
            </FormControl>
            <ModalActions
              onConfirm={handleSubmit}
              onCancel={handleCloseCreateFolderModal}
              confirmText="Save"
              cancelText="Cancel"
            />
          </Form>
        )}
      </Formik>
    </CommonModal>
  );
};

export default CreateEditFolderModal;
