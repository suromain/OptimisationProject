import { ChangeEvent, FC, useCallback } from "react";

interface Props {
  mode?: "input" | "select";
  options?: string[];
  value: string;
  onChange: (newValue: string) => void;
}

const CustomProblemField: FC<Props> = ({
  mode = "input",
  options = [],
  value,
  onChange,
}) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );
  return (
    <>
      {mode === "input" && (
        <input type="text" value={value} onChange={handleChange} />
      )}
      {mode === "select" && (
        <select
          value={value}
          onChange={handleChange}
          style={{ width: "120px" }}
        >
          {options.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

export default CustomProblemField;
