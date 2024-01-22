export type TShirt = "blue" | "green" | "red" | "white" | "yellow";
export type Name = "andrea" | "holly" | "julie" | "leslie" | "victoria";
export type Surname = "brown" | "davis" | "lopes" | "miller" | "wilson";
export type Pasta = "farfalle" | "lasagne" | "penne" | "spaghetti" | "ravioli";
export type Wine =
  | "australian"
  | "argentine"
  | "chilean"
  | "french"
  | "italian";
export type Age = 30 | 35 | 40 | 45 | 50;

export interface ZebraSolution {
  tshirts: TShirt[];
  names: Name[];
  surnames: Surname[];
  pastas: Pasta[];
  wines: Wine[];
  ages: Age[];
}

export const AllTshirts: TShirt[] = ["blue", "green", "red", "white", "yellow"];

export const AllNames: Name[] = [
  "andrea",
  "holly",
  "julie",
  "leslie",
  "victoria",
];

export const AllSurnames: Surname[] = [
  "brown",
  "davis",
  "lopes",
  "miller",
  "wilson",
];

export const AllPastas: Pasta[] = [
  "farfalle",
  "lasagne",
  "penne",
  "spaghetti",
  "ravioli",
];

export const AllWines: Wine[] = [
  "australian",
  "argentine",
  "chilean",
  "french",
  "italian",
];

export const AllAges: Age[] = [30, 35, 40, 45, 50];
