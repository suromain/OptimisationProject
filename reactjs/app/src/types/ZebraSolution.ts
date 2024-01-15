export type TShirts = "blue" | "green" | "red" | "white" | "yellow";
export type Names = "andrea" | "holly" | "julie" | "leslie" | "victoria";
export type Surnames = "brown" | "davis" | "lopes" | "miller" | "wilson";
export type Pastas = "farfalle" | "lasagne" | "penne" | "spaghetti" | "ravioli";
export type Wines =
  | "australian"
  | "argentine"
  | "chilean"
  | "french"
  | "italian";
export type Ages = 30 | 35 | 40 | 45 | 50;

export interface ZebraSolution {
  tshirts: TShirts[];
  names: Names[];
  surnames: Surnames[];
  pastas: Pastas[];
  wines: Wines[];
  ages: Ages[];
}
