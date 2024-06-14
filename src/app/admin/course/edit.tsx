import { Edit, SimpleForm, TextInput } from "react-admin";

export const CourseEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="title" />
      <TextInput source="imageSrc" />
    </SimpleForm>
  </Edit>
);
