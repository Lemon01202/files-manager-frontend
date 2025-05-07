import React from 'react';
import { TextField, MenuItem } from '@mui/material';
import CommonModal from 'components/modals/commonModal';
import ModalActions from 'components/modalActions/modalActions';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { shareFileValidationSchema } from 'validation/shareFile';

interface ShareFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (email: string, permission: 'view' | 'edit') => void;
}

interface ShareFileFormValues {
  email: string;
  permission: 'view' | 'edit';
}

const ShareFileModal: React.FC<ShareFileModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const initialValues: ShareFileFormValues = {
    email: '',
    permission: 'view',
  };

  const handleSubmit = (
    values: ShareFileFormValues,
    { resetForm }: FormikHelpers<ShareFileFormValues>
  ) => {
    onConfirm(values.email, values.permission);
    resetForm();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="Share File Access"
      size="sm"
      actions={<></>}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={shareFileValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Form>
            <Field
              as={TextField}
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              margin="normal"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <Field
              as={TextField}
              select
              label="Permission"
              name="permission"
              value={values.permission}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              margin="normal"
              error={touched.permission && Boolean(errors.permission)}
              helperText={touched.permission && errors.permission}
              InputProps={{
                style: { textAlign: 'left' },
              }}
            >
              <MenuItem value="view">View</MenuItem>
              <MenuItem value="edit">Edit</MenuItem>
            </Field>
            <ModalActions
              onConfirm={() => handleSubmit()}
              onCancel={onClose}
              confirmText="Share"
              cancelText="Cancel"
            />
          </Form>
        )}
      </Formik>
    </CommonModal>
  );
};

export default ShareFileModal;
