import {
  BooleanField,
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  SelectField,
  TextField,
} from "react-admin";

export const ChallengeOptionList = () => (
  <List>
    <Datagrid rowClick="edit">
      <NumberField source="id" />
      <TextField source="text" />
      <BooleanField source="correct"></BooleanField>
      <ReferenceField source="challengeId" reference="challenges" />
      <TextField source="imageSrc" />
      <TextField source="audioSrc" />
    </Datagrid>
  </List>
);
