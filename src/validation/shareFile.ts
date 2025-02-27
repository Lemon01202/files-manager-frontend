import * as Yup from "yup";

export const shareFileValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  permission: Yup.string()
    .oneOf(['view', 'edit'], 'Invalid permission')
    .required('Permission is required'),
});
