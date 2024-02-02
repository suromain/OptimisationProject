import { FC } from "react";
import { SolverResponse } from "../../types/SolverResponse";

interface Props {
  response: SolverResponse;
}

const ZebraHints: FC<Props> = ({ response }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}>
      {response.map((item) => (
        <p
          key={item.constraint}
          style={{
            textDecoration: item.success ? "line-through" : undefined,
            flexGrow: 1,
            flexBasis: "40%",
            boxSizing: "border-box",
            margin: "0px",
            height: "40px",
            marginRight: "5px",
          }}
        >
          {item.constraint}
        </p>
      ))}
    </div>
  );
};

export default ZebraHints;
