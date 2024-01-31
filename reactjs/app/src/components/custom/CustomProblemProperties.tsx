import { FC, useCallback } from "react";
import { Properties } from "../../types/CustomProblem";
import CustomProblemField from "./CustomProblemField";

interface Props {
  properties: Properties;
  onPropertiesChange: (newProperties: Properties) => void;
  editMode: boolean;
}

const CustomProblemProperties: FC<Props> = ({
  properties,
  onPropertiesChange,
  editMode,
}) => {
  const handleNameChange = useCallback(
    (idx: number) => (newValue: string) => {
      onPropertiesChange({
        ...properties,
        names: properties.names.map((name, nameIdx) =>
          idx === nameIdx ? newValue : name
        ),
      });
    },
    [properties, onPropertiesChange]
  );

  const handlePlaceChange = useCallback(
    (idx: number) => (newValue: string) => {
      onPropertiesChange({
        ...properties,
        places: properties.places.map((place, placeIdx) =>
          idx === placeIdx ? newValue : place
        ),
      });
    },
    [properties, onPropertiesChange]
  );

  const handleObjectChange = useCallback(
    (idx: number) => (newValue: string) => {
      onPropertiesChange({
        ...properties,
        objects: properties.objects.map((object, objectIdx) =>
          idx === objectIdx ? newValue : object
        ),
      });
    },
    [properties, onPropertiesChange]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <p style={{ width: "80px" }}>Noms : </p>
        {properties.names.map((name, idx) => (
          <CustomProblemField
            key={`name${idx}`}
            value={name}
            onChange={handleNameChange(idx)}
            mode={editMode ? "input" : "select"}
            options={properties.names}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <p style={{ width: "80px" }}>Lieux : </p>
        {properties.places.map((place, idx) => (
          <CustomProblemField
            key={`place${idx}`}
            value={place}
            onChange={handlePlaceChange(idx)}
            mode={editMode ? "input" : "select"}
            options={properties.places}
          />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <p style={{ width: "80px" }}>Objets : </p>
        {properties.objects.map((object, idx) => (
          <CustomProblemField
            key={`object${idx}`}
            value={object}
            onChange={handleObjectChange(idx)}
            mode={editMode ? "input" : "select"}
            options={properties.objects}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomProblemProperties;
