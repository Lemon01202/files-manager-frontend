import * as Yup from 'yup';

export const folderValidationSchema = Yup.object().shape({
  folderName: Yup.string()
    .trim()
    .min(1, 'Folder name is required')
    .max(30, 'Folder name must be at most 30 characters')
    .required('Folder name is required'),
});
