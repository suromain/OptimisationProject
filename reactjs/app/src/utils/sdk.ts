import axios from "axios";
import { SolverResponse } from "../types/SolverResponse";
import { ZebraSolution } from "../types/ZebraSolution";
import { PersonalComputerSolution } from "../types/PersonalComputerSolution";

const client = axios.create({
  baseURL: "http://localhost:8080",
});

const sdk = {
  zebra: {
    checkSolution: async (solution: ZebraSolution): Promise<SolverResponse> => {
      const { data } = await client.post("/api/zebra", solution);
      return data;
    },
  },
  personalComputer: {
    checkSolution: async (
      solution: PersonalComputerSolution
    ): Promise<SolverResponse> => {
      const { data } = await client.post("/api/personal-computer", solution);
      return data;
    },
  },
};

export default sdk;
