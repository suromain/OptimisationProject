import { FC } from "react";
import { SolverResponse } from "../../types/SolverResponse";
import "./ZebraHints.css";

interface Props {
  response: SolverResponse;
}

const ZebraHints: FC<Props> = ({ response }) => {
  return (
    <div className="hint_container">
      {response.map((item) => (
        <p
          key={item.constraint}
          style={{ textDecoration: item.success ? "line-through" : undefined }}
          className="hint_item"
        >
          {item.constraint}
        </p>
      ))}
    </div>
  );
};

export default ZebraHints;
