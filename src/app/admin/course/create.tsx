import {
  Create,
  Datagrid,
  required,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";

export const CourseCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" validate={[required()]} label="Title" />
      <TextInput source="imageSrc" validate={[required()]} label="Image" />
    </SimpleForm>
  </Create>
);
