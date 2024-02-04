import { FC } from "react";
import { SolverResponse } from "../../types/SolverResponse";

interface Props {
  response: SolverResponse;
}

const ZebraHints: FC<Props> = ({ response }) => {
  return (
    <div className="hints">
      {response.map((item) => (
        <p
          key={item.constraint}
          style={{
            textDecoration: item.success ? undefined : "line-through"
          }}
        >
          {item.constraint}
        </p>
      ))}
    </div>
  );
};

export default ZebraHints;
