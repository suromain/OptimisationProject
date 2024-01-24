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
          style={{ color: item.success ? "green" : "red" }}
          className="hint_item"
        >
          {item.constraint}
        </p>
      ))}
    </div>
  );
};

export default ZebraHints;