import {
  Edit,
  NumberInput,
  ReferenceInput,
  required,
  SimpleForm,
  TextInput,
} from "react-admin";

export const UnitEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" validate={[required()]} label="Id" />
      <TextInput source="title" validate={[required()]} label="Title" />
      <TextInput
        source="description"
        validate={[required()]}
        label="Description"
      />
      <ReferenceInput source="courseId" reference="courses"></ReferenceInput>

      <NumberInput source="order" validate={[required()]} label="Order" />
    </SimpleForm>
  </Edit>
);