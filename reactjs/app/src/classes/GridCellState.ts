export class GridCellState {
  crossed: boolean;
  ticked: boolean;
  disabled: boolean;

  constructor() {
    this.crossed = false;
    this.ticked = false;
    this.disabled = false;
  }
}