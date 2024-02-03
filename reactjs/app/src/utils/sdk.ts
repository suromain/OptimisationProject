import axios from "axios";
import { ConstraintsResponse, SolverResponse } from "../types/SolverResponse";
import { ZebraSolution } from "../types/ZebraSolution";
import { PersonalComputerSolution } from "../types/PersonalComputerSolution";
import {
  CustomProblem,
  CustomProblemSolution,
} from "../types/CustomProblem.ts";

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
    getConstraints: async (): Promise<ConstraintsResponse> => {
      const { data } = await client.get("/api/personal-computer");
      return data;
    },
    checkSolution: async (
      solution: PersonalComputerSolution
    ): Promise<SolverResponse> => {
      const { data } = await client.post<SolverResponse>(
        "/api/personal-computer",
        solution
      );
      return data;
    },
  },
  custom: {
    create: async (customProblem: CustomProblem): Promise<string> => {
      const { data } = await client.post<{ id: number }>(
        "/api/custom-puzzle",
        customProblem
      );
      return String(data.id);
    },
    checkSolution: async (
      id: string,
      solution: CustomProblemSolution
    ): Promise<boolean> => {
      const { data } = await client.post<{ correct: boolean }>(
        `/api/custom-puzzle/${id}`,
        solution
      );
      return data.correct;
    },
    get: async (id: string): Promise<CustomProblem & { id: number }> => {
      const { data } = await client.get<CustomProblem & { id: number }>(
        `/api/custom-puzzle/${id}`
      );
      return data;
    },
    list: async (): Promise<(CustomProblem & { id: string })[]> => {
      const { data } = await client.get<(CustomProblem & { id: string })[]>(
        "/api/custom-puzzle"
      );
      return data;
    },
  },
};

export default sdk;
