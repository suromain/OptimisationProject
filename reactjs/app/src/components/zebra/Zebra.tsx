import { FC, useCallback, useEffect, useState } from "react";
import {
  AllAges,
  AllNames,
  AllPastas,
  AllSurnames,
  AllTshirts,
  AllWines,
  ZebraSolution,
} from "../../types/ZebraSolution";
import { SolverResponse } from "../../types/SolverResponse";
import sdk from "../../utils/sdk";
import ZebraForm from "./ZebraForm";
import ZebraHints from "./ZebraHints";

export const Zebra: FC = () => {
  const [solution, setSolution] = useState<ZebraSolution>({
    tshirts: AllTshirts,
    names: AllNames,
    surnames: AllSurnames,
    pastas: AllPastas,
    wines: AllWines,
    ages: AllAges,
  });

  const [response, setResponse] = useState<SolverResponse>([]);

  const handleSolutionChange = useCallback((newSolution: ZebraSolution) => {
    setSolution(newSolution);
  }, []);

  const fetchResponse = useCallback(async () => {
    const newResponse = await sdk.zebra.checkSolution(solution);
    setResponse(newResponse);
  }, [solution]);

  useEffect(() => {
    void fetchResponse();
  }, [fetchResponse]);

  useEffect(() => {
    if (response.length !== 0 && response.every((r) => r.success)) {
      alert("Gagné !");
    }
  }, [response]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "30px",
      }}
    >
      <ZebraForm solution={solution} onChange={handleSolutionChange} />
      <ZebraHints response={response} />
    </div>
  );
};

export default Zebra;
