import { ChangeEvent, FC, useCallback } from "react";
import {
  Comparator,
  Connector,
  Constraint,
  OperandType,
  Operands,
  getOperandType,
} from "../../types/CustomProblem";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  constraint: Constraint;
  onConstraintChange: (newConstraint: Constraint) => void;
  operands: Operands;
  onDelete: () => void;
  editMode: boolean;
}

const SELECT_WIDTH = "100px";

const CustomProblemConstraint: FC<Props> = ({
  constraint,
  onConstraintChange,
  operands,
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
        atom: {
          ...constraint.atom,
          operand: e.target.value,
          operand_type: getOperandType(operands, e.target.value),
        },
      });
    },
    [constraint, onConstraintChange, operands]
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
            atom: {
              comparator: Comparator.EQ,
              operand: operands.names[0] ?? "",
              operand_type: OperandType.NAME,
            },
            negative: false,
            next: null,
          },
        },
      });
    }
  }, [constraint, onConstraintChange, operands]);

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
        {operands.names.map((operand, idx) => (
          <option key={idx} value={operand}>
            {`nom[${operand}]`}
          </option>
        ))}
        {operands.objects.map((operand, idx) => (
          <option key={idx} value={operand}>
            {`objet[${operand}]`}
          </option>
        ))}
        {operands.places.map((operand, idx) => (
          <option key={idx} value={operand}>
            {`nom[${operand}]`}
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
            operands={operands}
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
