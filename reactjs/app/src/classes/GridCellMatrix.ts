import {CellState} from "../types/CellState.ts";

export class GridCellMatrix {
  cells: CellState[][];
  height: number;
  width: number;

  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;
    this.cells = new Array<CellState[]>(height);

    for (let i = 0; i < height; i++) {
      this.cells[i] = new Array<CellState>(width);
      for (let j = 0; j < width; j++)
        this.cells[i][j] = CellState.EMPTY;
    }
  }

  getCellState(row: number, col: number) {
    return this.cells[row][col];
  }

  changeCellState(row: number, col: number) {
    // If the cell is disabled, do nothing
    if (this.cells[row][col] == CellState.DISABLED || this.cells[row][col] == CellState.CROSSED_AND_DISABLED)
      return;
    else if (this.cells[row][col] == CellState.EMPTY)
      this.cells[row][col] = CellState.CROSSED;
    else if (this.cells[row][col] == CellState.CROSSED) {
      this.cells[row][col] = CellState.TICKED;

      // Disable all other cells in the same row and column
      for (let i = 0; i < this.width; i++)
        if (i != col)
          if (this.cells[row][i] == CellState.CROSSED)
            this.cells[row][i] = CellState.CROSSED_AND_DISABLED;
          else
            this.cells[row][i] = CellState.DISABLED;

      for (let i = 0; i < this.height; i++)
        if (i != row)
          if (this.cells[i][col] == CellState.CROSSED)
            this.cells[i][col] = CellState.CROSSED_AND_DISABLED;
          else
            this.cells[i][col] = CellState.DISABLED;
    }
    // If the cell is ticked, untick it
    else if (this.cells[row][col] == CellState.TICKED) {
        this.cells[row][col] = CellState.EMPTY;

        // Enable all other cells in the same row and column
        for (let i = 0; i < this.width; i++)
          if (i != col)
            if (this.cells[row][i] == CellState.CROSSED_AND_DISABLED)
              this.cells[row][i] = CellState.CROSSED;
            else
              this.cells[row][i] = CellState.EMPTY;

        for (let i = 0; i < this.height; i++)
          if (i != row)
            if (this.cells[i][col] == CellState.CROSSED_AND_DISABLED)
              this.cells[i][col] = CellState.CROSSED;
            else
              this.cells[i][col] = CellState.EMPTY;
    }
    else
      throw Error("Invalid cell state");
  }
}