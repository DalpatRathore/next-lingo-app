import {
  BooleanInput,
  Create,
  Datagrid,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";

export const ChallengeOptionCreate = () => (
  <Create>
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
  </Create>
);
