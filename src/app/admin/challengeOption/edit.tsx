import {
  BooleanInput,
  Edit,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const ChallengeOptionEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="text" validate={[required()]} label="Question" />
      <BooleanInput source="correct" label="Correct Option"></BooleanInput>

      <ReferenceInput
        source="challengeId"
        reference="challenges"
      ></ReferenceInput>

      <TextInput source="imageSrc" label="Image URL" />
      <TextInput source="audionSrc" label="Audion URL" />
    </SimpleForm>
  </Edit>
);
