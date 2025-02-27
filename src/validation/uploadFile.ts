import * as Yup from "yup";

export const uploadFileValidationSchema = Yup.object().shape({
  file: Yup.mixed().required('File is required'),
  isPublic: Yup.boolean(),
});
