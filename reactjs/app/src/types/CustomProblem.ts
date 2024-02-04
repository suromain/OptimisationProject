export interface Operands {
  names: string[];
  places: string[];
  objects: string[];
}

export enum OperandType {
  NAME = "NAME",
  PLACE = "PLACE",
  OBJECT = "OBJECT",
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
  operand_type: OperandType;
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
  operands: Operands;
}

export function getOperandType(
  operands: Operands,
  operand: string
): OperandType {
  if (operands.names.some((name) => name === operand)) {
    return OperandType.NAME;
  }
  if (operands.objects.some((object) => object === operand)) {
    return OperandType.OBJECT;
  }
  return OperandType.PLACE;
}

export type CustomProblemSolution = Operands;
