import {
  Edit,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const ChallengeEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="question" validate={[required()]} label="Question" />
      <SelectInput
        source="type"
        choices={[
          {
            id: "SELECT",
            name: "SELECT",
          },
          {
            id: "ASSIST",
            name: "ASSIST",
          },
        ]}
        validate={[required()]}
        label="Question"
      ></SelectInput>

      <ReferenceInput source="lessonId" reference="lessons"></ReferenceInput>

      <NumberInput source="order" validate={[required()]} label="Order" />
    </SimpleForm>
  </Edit>
);
