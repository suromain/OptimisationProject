import { FC, useCallback, useEffect, useState } from "react";
import { CustomProblem } from "../../types/CustomProblem";
import sdk from "../../utils/sdk";
import { Link } from "react-router-dom";

const CustomProblems: FC = () => {
  const [problems, setProblems] = useState<(CustomProblem & { id: string })[]>(
    []
  );

  const fetchProblems = useCallback(async () => {
    const fetchedProblems = await sdk.custom.list();
    setProblems(fetchedProblems);
  }, []);

  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {problems.map((problem, idx) => (
        <Link key={idx} to={`/custom/${problem.id}`}>
          {problem.name}
        </Link>
      ))}
    </div>
  );
};

export default CustomProblems;
