import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Comparator, Constraint, Properties } from "../../types/CustomProblem";
import CustomProblemProperties from "./CustomProblemProperties";
import CustomProblemConstraint from "./CustomProblemConstraint";
import sdk from "../../utils/sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";

const CustomProblem: FC = () => {
  const history = useNavigate();
  const { id } = useParams<"id">();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [properties, setProperties] = useState<Properties>({
    names: ["Sarah", "Jean", "Pierre"],
    places: ["Angers", "Paris", "Bangkok"],
    objects: ["Crayon", "Ordinateur", "Briquet"],
  });
  const [constraints, setConstraints] = useState<Constraint[]>([]);
  const [solved, setSolved] = useState<boolean>(false);

  const allProperties = useMemo(
    () => [...properties.names, ...properties.objects, ...properties.places],
    [properties]
  );

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

  const handlePropertiesChange = useCallback(
    async (newProperties: Properties) => {
      setProperties(newProperties);
      if (!editMode) {
        const solved = await sdk.custom.solve("1", properties);
        setSolved(solved);
      }
    },
    [editMode, properties]
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
        atom: { comparator: Comparator.EQ, operand: allProperties[0] ?? "" },
        next: null,
      },
    ]);
  }, [allProperties]);

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
        operands: properties,
      });
      history(`/custom/${id}`);
    } catch (e) {
      alert("Erreur lors de l'enregistrement du problème");
    }
  }, [constraints, description, history, name, properties]);

  const fetchProblem = useCallback(async () => {
    if (id !== undefined && id !== "new") {
      const problem = await sdk.custom.get(id);
      setConstraints(problem.constraints);
      setDescription(problem.description);
      setProperties(problem.operands);
      setName(problem.name);
    }
  }, [id]);

  useEffect(() => {
    fetchProblem();
  }, [fetchProblem]);

  return (
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
      <CustomProblemProperties
        properties={properties}
        onPropertiesChange={handlePropertiesChange}
        editMode={editMode}
      />
      {constraints.map((constraint, idx) => (
        <div
          key={idx}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
            <CustomProblemConstraint
              constraint={constraint}
              properties={allProperties}
              onConstraintChange={handleConstraintChange(idx)}
              onDelete={handleDeleteConstraint(idx)}
              editMode={editMode}
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
          <button onClick={handleAddConstraint}>Ajouter une contrainte</button>
          <button onClick={handleSubmit}>Enregistrer</button>
        </>
      )}
      {!editMode && <p>{solved ? "resolu" : "non resolu"}</p>}
    </div>
  );
};

export default CustomProblem;
