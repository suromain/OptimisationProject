export interface Properties {
  names: string[];
  places: string[];
  objects: string[];
}

export enum Comparator {
  EQ = "EQ",
  NEQ = "NEQ",
}

export enum Connector {
  AND = "AND",
  OR = "OR",
  IMPLIES = "IMPLIES",
}

interface Atom {
  comparator: Comparator;
  operand: string;
}

interface Next {
  connector: Connector;
  constraint: Constraint;
}

export interface Constraint {
  negative: boolean;
  atom: Atom;
  next: Next | null;
}

export interface CustomProblem {
  name: string;
  description: string;
  constraints: Constraint[];
  operands: Properties;
}

export type CustomProblemSolution = Properties;
