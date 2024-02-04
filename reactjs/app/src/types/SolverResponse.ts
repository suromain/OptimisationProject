interface SolverResponseItem {
  constraint: string;
  success: boolean;
}

interface ConstraintsResponseItem {
  constraints: string[];
}

export type SolverResponse = SolverResponseItem[];
export type ConstraintsResponse = ConstraintsResponseItem;
