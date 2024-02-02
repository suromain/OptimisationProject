import { ChangeEvent, FC, useCallback } from "react";
import { Comparator, Connector, Constraint } from "../../types/CustomProblem";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  constraint: Constraint;
  onConstraintChange: (newConstraint: Constraint) => void;
  properties: string[];
  onDelete: () => void;
  editMode: boolean;
}

const SELECT_WIDTH = "100px";

const CustomProblemConstraint: FC<Props> = ({
  constraint,
  onConstraintChange,
  properties,
  onDelete,
  editMode,
}) => {
  const handleSignChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      onConstraintChange({ ...constraint, negative: e.target.value === "NOT" });
    },
    [constraint, onConstraintChange]
  );

  const handleAtomComparatorChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      onConstraintChange({
        ...constraint,
        atom: { ...constraint.atom, comparator: e.target.value as Comparator },
      });
    },
    [constraint, onConstraintChange]
  );

  const handleAtomOperandChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      onConstraintChange({
        ...constraint,
        atom: { ...constraint.atom, operand: e.target.value },
      });
    },
    [constraint, onConstraintChange]
  );

  const handleNextConnectorChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      if (constraint.next !== null) {
        onConstraintChange({
          ...constraint,
          next: { ...constraint.next, connector: e.target.value as Connector },
        });
      }
    },
    [constraint, onConstraintChange]
  );

  const handleNextConstraintChange = useCallback(
    (newConstraint: Constraint) => {
      if (constraint.next !== null) {
        onConstraintChange({
          ...constraint,
          next: { ...constraint.next, constraint: newConstraint },
        });
      }
    },
    [constraint, onConstraintChange]
  );

  const handleAddNext = useCallback(() => {
    if (constraint.next === null) {
      onConstraintChange({
        ...constraint,
        next: {
          connector: Connector.AND,
          constraint: {
            atom: { comparator: Comparator.EQ, operand: properties[0] },
            negative: false,
            next: null,
          },
        },
      });
    }
  }, [constraint, onConstraintChange, properties]);

  const handleDeleteNext = useCallback(() => {
    if (constraint.next !== null) {
      onConstraintChange({
        ...constraint,
        next: null,
      });
    }
  }, [constraint, onConstraintChange]);

  const handleDelete = useCallback(() => {
    onDelete();
  }, [onDelete]);

  return (
    <>
      <select
        value={constraint.negative ? "NOT" : " "}
        onChange={handleSignChange}
        style={{ width: SELECT_WIDTH }}
        disabled={!editMode}
      >
        <option value="NOT">NOT</option>
        <option value=" "> </option>
      </select>

      <select
        value={constraint.atom.comparator}
        onChange={handleAtomComparatorChange}
        style={{ width: SELECT_WIDTH }}
        disabled={!editMode}
      >
        {Object.values(Comparator).map((comparator, idx) => (
          <option key={idx} value={comparator}>
            {comparator}
          </option>
        ))}
      </select>

      <select
        value={constraint.atom.operand}
        onChange={handleAtomOperandChange}
        style={{ width: SELECT_WIDTH }}
        disabled={!editMode}
      >
        {properties.map((property, idx) => (
          <option key={idx} value={property}>
            {property}
          </option>
        ))}
      </select>
      {constraint.next === null && editMode && (
        <button style={{ marginLeft: "5px" }} onClick={handleDelete}>
          <FontAwesomeIcon icon={faMinus} />
        </button>
      )}
      {constraint.next !== null && (
        <>
          <select
            value={constraint.next.connector}
            onChange={handleNextConnectorChange}
            style={{
              width: SELECT_WIDTH,
            }}
            disabled={!editMode}
          >
            {Object.values(Connector).map((connector, idx) => (
              <option value={connector} key={idx}>
                {connector}
              </option>
            ))}
          </select>
          <CustomProblemConstraint
            constraint={constraint.next.constraint}
            onConstraintChange={handleNextConstraintChange}
            properties={properties}
            onDelete={handleDeleteNext}
            editMode={editMode}
          />
        </>
      )}
      {constraint.next === null && editMode && (
        <button style={{ marginLeft: "5px" }} onClick={handleAddNext}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      )}
    </>
  );
};

export default CustomProblemConstraint;
