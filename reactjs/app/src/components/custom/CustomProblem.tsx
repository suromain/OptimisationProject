import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Comparator,
  Constraint,
  CustomProblemSolution,
  OperandType,
  Operands,
} from "../../types/CustomProblem";
import CustomProblemConstraint from "./CustomProblemConstraint";
import sdk from "../../utils/sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import CustomProblemOperands from "./CustomProblemOperands";

const CustomProblem: FC = () => {
  const history = useNavigate();
  const { id } = useParams<"id">();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [operands, setOperands] = useState<Operands>({
    names: ["Sarah", "Jean", "Pierre"],
    places: ["Angers", "Paris", "Bangkok"],
    objects: ["Crayon", "Ordinateur", "Briquet"],
  });
  const [solution, setSolution] = useState<Operands>({
    names: [],
    places: [],
    objects: [],
  });
  const [constraints, setConstraints] = useState<Constraint[]>([]);
  const [solved, setSolved] = useState<boolean>(false);

  const editMode = useMemo(() => id === "new", [id]);

  const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const handleDescriptionChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(e.target.value);
    },
    []
  );

  const handleOperandsChange = useCallback(
    async (newOperands: Operands) => {
      if (editMode) {
        setOperands(newOperands);
      }
    },
    [editMode]
  );

  const handleSolutionChange = useCallback(
    async (newSolution: CustomProblemSolution) => {
      if (!editMode) {
        setSolution(newSolution);
      }
    },
    [editMode]
  );

  const handleConstraintChange = useCallback(
    (idx: number) => (newConstraint: Constraint) => {
      setConstraints((oldConstraints) =>
        oldConstraints.map((constraint, constraintIdx) =>
          constraintIdx === idx ? newConstraint : constraint
        )
      );
    },
    []
  );

  const handleAddConstraint = useCallback(() => {
    setConstraints((oldConstraints) => [
      ...oldConstraints,
      {
        negative: false,
        atom: {
          comparator: Comparator.EQ,
          operand: operands.names[0] ?? "",
          operand_type: OperandType.NAME,
        },
        next: null,
      },
    ]);
  }, [operands.names]);

  const handleDeleteConstraint = useCallback(
    (idx: number) => () => {
      setConstraints((oldConstraints) =>
        oldConstraints.reduce(
          (acc: Constraint[], current: Constraint, currentIdx) =>
            currentIdx === idx ? acc : [...acc, current],
          []
        )
      );
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    try {
      const id = await sdk.custom.create({
        name: name,
        description: description,
        constraints: constraints,
        operands: operands,
      });
      history(`/custom/${id}`);
    } catch (e) {
      alert("Erreur lors de l'enregistrement du problème");
    }
  }, [constraints, description, history, name, operands]);

  const fetchProblem = useCallback(async () => {
    if (id !== undefined && id !== "new") {
      const problem = await sdk.custom.get(id);
      setConstraints(problem.constraints);
      setDescription(problem.description);
      setOperands(problem.operands);
      setSolution(problem.operands);
      setName(problem.name);
    } else {
      setConstraints([]);
      setDescription("");
      setOperands({
        names: ["Sarah", "Jean", "Pierre"],
        places: ["Angers", "Paris", "Bangkok"],
        objects: ["Crayon", "Ordinateur", "Briquet"],
      });
      setSolution({
        names: [],
        places: [],
        objects: [],
      });
      setName("");
    }
  }, [id]);

  const checkSolution = useCallback(async () => {
    if (id !== undefined && !editMode && solution.names.length > 0) {
      setSolved(await sdk.custom.checkSolution(id, solution));
    }
  }, [editMode, id, solution]);

  useEffect(() => {
    void fetchProblem();
  }, [fetchProblem]);

  useEffect(() => {
    void checkSolution();
  }, [checkSolution]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50vw",
          gap: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <label style={{ width: "150px" }} htmlFor="name">
            Nom :
          </label>
          <input
            style={{ flex: 1 / 2 }}
            id="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            disabled={!editMode}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <label style={{ width: "150px" }} htmlFor="description">
            Description :
          </label>
          <textarea
            style={{ flex: 1 / 2 }}
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            disabled={!editMode}
          />
        </div>
        <CustomProblemOperands
          operands={operands}
          solution={solution}
          onOperandsChange={handleOperandsChange}
          onSolutionChange={handleSolutionChange}
          editMode={editMode}
          disabled={constraints.length > 0}
        />
        {editMode &&
          constraints.map((constraint, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "row", gap: "4px" }}
              >
                <CustomProblemConstraint
                  constraint={constraint}
                  operands={operands}
                  onConstraintChange={handleConstraintChange(idx)}
                  onDelete={handleDeleteConstraint(idx)}
                />
              </div>
              {editMode && (
                <button
                  style={{ marginLeft: "5px" }}
                  onClick={handleDeleteConstraint(idx)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              )}
            </div>
          ))}
        {editMode && (
          <>
            <button onClick={handleAddConstraint}>
              Ajouter une contrainte
            </button>
            <button onClick={handleSubmit}>Enregistrer</button>
          </>
        )}
        {!editMode && <p>{solved ? "resolu" : "non resolu"}</p>}
      </div>
    </div>
  );
};

export default CustomProblem;
