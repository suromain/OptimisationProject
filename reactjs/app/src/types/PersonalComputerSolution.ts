export type Processors = 25 | 20 | 23 | 27 | 31 | null;
export type Prices = 1349 | 999 | 699 | 1149 | 1649 | null;
export type Monitors = 156 | 130 | 150 | 215 | 270 | null;
export type HardDisks = 500 | 320 | 250 | 1024 | 750 | null;

export interface PersonalComputerSolution {
  processors: Processors[];
  prices: Prices[];
  monitors: Monitors[];
  hardDisks: HardDisks[];
  andrews_choice: 3;
}
