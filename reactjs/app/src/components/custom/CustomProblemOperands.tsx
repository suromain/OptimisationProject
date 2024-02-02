import { FC, useCallback } from "react";
import { Operands } from "../../types/CustomProblem";
import CustomProblemField from "./CustomProblemField";

interface Props {
  operands: Operands;
  onOperandsChange: (newOperands: Operands) => void;
  editMode: boolean;
}

const CustomProblemOperands: FC<Props> = ({
  operands,
  onOperandsChange,
  editMode,
}) => {
  const handleNameChange = useCallback(
    (idx: number) => (newValue: string) => {
      onOperandsChange({
        ...operands,
        names: operands.names.map((name, nameIdx) =>
          idx === nameIdx ? newValue : name
        ),
      });
    },
    [operands, onOperandsChange]
  );

  const handlePlaceChange = useCallback(
    (idx: number) => (newValue: string) => {
      onOperandsChange({
        ...operands,
        places: operands.places.map((place, placeIdx) =>
          idx === placeIdx ? newValue : place
        ),
      });
    },
    [operands, onOperandsChange]
  );

  const handleObjectChange = useCallback(
    (idx: number) => (newValue: string) => {
      onOperandsChange({
        ...operands,
        objects: operands.objects.map((object, objectIdx) =>
          idx === objectIdx ? newValue : object
        ),
      });
    },
    [operands, onOperandsChange]
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
        {operands.names.map((name, idx) => (
          <CustomProblemField
            key={`name${idx}`}
            value={name}
            onChange={handleNameChange(idx)}
            mode={editMode ? "input" : "select"}
            options={operands.names}
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
        {operands.places.map((place, idx) => (
          <CustomProblemField
            key={`place${idx}`}
            value={place}
            onChange={handlePlaceChange(idx)}
            mode={editMode ? "input" : "select"}
            options={operands.places}
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
        {operands.objects.map((object, idx) => (
          <CustomProblemField
            key={`object${idx}`}
            value={object}
            onChange={handleObjectChange(idx)}
            mode={editMode ? "input" : "select"}
            options={operands.objects}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomProblemOperands;
