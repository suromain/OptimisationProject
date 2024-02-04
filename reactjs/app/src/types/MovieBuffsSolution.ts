export type Names = "Jessica" | "Laurie" | "Mark" | "Mary" | "Sally" | null
export type Films = "Minutes88" | "DonnieBrasco" | "Scarecrow" | "Scarface" | "TheRecruit" | null
export type Days = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | null
export type Times = 35 | 40 | 80 | 90 | 105 | null

export interface MovieBuffsSolution {
  members: Names[];
  movies: Films[];
  days: Days[];
  hours: Times[];
}
