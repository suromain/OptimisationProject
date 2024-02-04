import { ChangeEvent, FC, useCallback } from "react";
import {
  Age,
  AllAges,
  AllNames,
  AllPastas,
  AllSurnames,
  AllTshirts,
  AllWines,
  Name,
  Pasta,
  Surname,
  TShirt,
  Wine,
  ZebraSolution,
} from "../../types/ZebraSolution";

interface Props {
  solution: ZebraSolution;
  onChange: (newSolution: ZebraSolution) => void;
}

const ZebraForm: FC<Props> = ({ solution, onChange }) => {
  const handleTShirtChange = useCallback(
    (idx: number) => (e: ChangeEvent<HTMLSelectElement>) => {
      const newSolution = {
        ...solution,
        tshirts: solution.tshirts.map((tshirt, tshirtIdx) =>
          tshirtIdx === idx ? (e.target.value as TShirt) : tshirt
        ),
      };
      onChange(newSolution);
    },
    [onChange, solution]
  );

  const handleNameChange = useCallback(
    (idx: number) => (e: ChangeEvent<HTMLSelectElement>) => {
      const newSolution = {
        ...solution,
        names: solution.names.map((name, nameIdx) =>
          nameIdx === idx ? (e.target.value as Name) : name
        ),
      };
      onChange(newSolution);
    },
    [onChange, solution]
  );

  const handleSurnameChange = useCallback(
    (idx: number) => (e: ChangeEvent<HTMLSelectElement>) => {
      const newSolution = {
        ...solution,
        surnames: solution.surnames.map((surname, surnameIdx) =>
          surnameIdx === idx ? (e.target.value as Surname) : surname
        ),
      };
      onChange(newSolution);
    },
    [onChange, solution]
  );

  const handlePastaChange = useCallback(
    (idx: number) => (e: ChangeEvent<HTMLSelectElement>) => {
      const newSolution = {
        ...solution,
        pastas: solution.pastas.map((pasta, pastaIdx) =>
          pastaIdx === idx ? (e.target.value as Pasta) : pasta
        ),
      };
      onChange(newSolution);
    },
    [onChange, solution]
  );

  const handleWineChange = useCallback(
    (idx: number) => (e: ChangeEvent<HTMLSelectElement>) => {
      const newSolution = {
        ...solution,
        wines: solution.wines.map((wine, wineIdx) =>
          wineIdx === idx ? (e.target.value as Wine) : wine
        ),
      };
      onChange(newSolution);
    },
    [onChange, solution]
  );

  const handleAgeChange = useCallback(
    (idx: number) => (e: ChangeEvent<HTMLSelectElement>) => {
      const newSolution = {
        ...solution,
        ages: solution.ages.map((age, ageIdx) =>
          ageIdx === idx ? (Number(e.target.value) as Age) : age
        ),
      };
      onChange(newSolution);
    },
    [onChange, solution]
  );

  return (
    <div className="options">
      <div className="row">
        <label>TShirts: </label>
        {solution.tshirts.map((tshirt, idx) => (
          <select
            key={idx}
            value={tshirt}
            onChange={handleTShirtChange(idx)}
          >
            {AllTshirts.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ))}
      </div>
      <div className="row">
        <label>Names: </label>
        {solution.names.map((name, idx) => (
          <select
            key={idx}
            value={name}
            onChange={handleNameChange(idx)}
          >
            {AllNames.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ))}
      </div>
      <div className="row">
        <label>Surnames: </label>
        {solution.surnames.map((surname, idx) => (
          <select
            key={idx}
            value={surname}
            onChange={handleSurnameChange(idx)}
          >
            {AllSurnames.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ))}
      </div>
      <div className="row">
        <label>Pastas: </label>
        {solution.pastas.map((pasta, idx) => (
          <select
            key={idx}
            value={pasta}
            onChange={handlePastaChange(idx)}
          >
            {AllPastas.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ))}
      </div>
      <div className="row">
        <label>Wines: </label>
        {solution.wines.map((wine, idx) => (
          <select
            key={idx}
            value={wine}
            onChange={handleWineChange(idx)}
          >
            {AllWines.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ))}
      </div>
      <div className="row">
        <label>Ages: </label>
        {solution.ages.map((age, idx) => (
          <select
            key={idx}
            value={age}
            onChange={handleAgeChange(idx)}
          >
            {AllAges.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ))}
      </div>
    </div>
  );
};

export default ZebraForm;
