import { FC, useCallback, useMemo } from "react";
import { CustomProblemSolution, Operands } from "../../types/CustomProblem";
import CustomProblemField from "./CustomProblemField";

interface Props {
  operands: Operands;
  onOperandsChange: (newOperands: Operands) => void;
  solution: CustomProblemSolution;
  onSolutionChange: (newSolution: CustomProblemSolution) => void;
  editMode: boolean;
  disabled: boolean;
}

const CustomProblemOperands: FC<Props> = ({
  operands,
  onOperandsChange,
  solution,
  onSolutionChange,
  editMode,
  disabled,
}) => {
  const values = useMemo(
    () => (editMode ? operands : solution),
    [editMode, operands, solution]
  );

  const onChange = useCallback(
    (newValues: Operands) => {
      if (editMode) {
        onOperandsChange(newValues);
      } else {
        onSolutionChange(newValues);
      }
    },
    [editMode, onOperandsChange, onSolutionChange]
  );

  const handleNameChange = useCallback(
    (idx: number) => (newValue: string) => {
      onChange({
        ...values,
        names: values.names.map((name, nameIdx) =>
          idx === nameIdx ? newValue : name
        ),
      });
    },
    [values, onChange]
  );

  const handlePlaceChange = useCallback(
    (idx: number) => (newValue: string) => {
      onChange({
        ...values,
        places: values.places.map((place, placeIdx) =>
          idx === placeIdx ? newValue : place
        ),
      });
    },
    [values, onChange]
  );

  const handleObjectChange = useCallback(
    (idx: number) => (newValue: string) => {
      onChange({
        ...values,
        objects: values.objects.map((object, objectIdx) =>
          idx === objectIdx ? newValue : object
        ),
      });
    },
    [values, onChange]
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
        {values.names.map((name, idx) => (
          <CustomProblemField
            key={`name${idx}`}
            value={name}
            onChange={handleNameChange(idx)}
            mode={editMode ? "input" : "select"}
            options={operands.names}
            disabled={disabled}
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
        {values.places.map((place, idx) => (
          <CustomProblemField
            key={`place${idx}`}
            value={place}
            onChange={handlePlaceChange(idx)}
            mode={editMode ? "input" : "select"}
            options={operands.places}
            disabled={disabled}
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
        {values.objects.map((object, idx) => (
          <CustomProblemField
            key={`object${idx}`}
            value={object}
            onChange={handleObjectChange(idx)}
            mode={editMode ? "input" : "select"}
            options={operands.objects}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomProblemOperands;
