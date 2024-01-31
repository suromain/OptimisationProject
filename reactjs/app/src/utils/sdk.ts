import axios from "axios";
import { SolverResponse } from "../types/SolverResponse";
import { ZebraSolution } from "../types/ZebraSolution";
import { PersonalComputerSolution } from "../types/PersonalComputerSolution";
import { CustomProblem, CustomProblemSolution } from "../types/CustomProblem";

const client = axios.create({
  baseURL: "http://localhost:8080",
});

const sdk = {
  zebra: {
    checkSolution: async (solution: ZebraSolution): Promise<SolverResponse> => {
      const { data } = await client.post<SolverResponse>(
        "/api/zebra",
        solution
      );
      return data;
    },
  },
  personalComputer: {
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
    // TODO: remove the mock when back is done
    create: async (customProblem: CustomProblem): Promise<string> => {
      const { constraints, description, name } = customProblem;
      const { data } = await client.post<{ id: number }>("/api/custom-puzzle", {
        constraints,
        description,
        name,
      });
      return String(data.id);
    },
    solve: async (
      id: string,
      solution: CustomProblemSolution
    ): Promise<boolean> => {
      const { data } = await client.post<boolean>(
        `/api/custom-puzzle/${id}`,
        solution
      );
      return data;
    },
    // TODO: remove the mock when the back is done
    get: async (id: string): Promise<CustomProblem & { id: number }> => {
      const { data } = await client.get<CustomProblem & { id: number }>(
        `/api/custom-puzzle/${id}`
      );
      data.operands = {
        names: ["Sarah", "Jean", "Pierre"],
        places: ["Angers", "Paris", "Bangkok"],
        objects: ["Crayon", "Ordinateur", "Briquet"],
      };
      return data;
    },
  },
};

export default sdk;
