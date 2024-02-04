import {ReactElement} from "react";
import {CellState} from "../types/CellState.ts";
import cross from "../assets/cross.svg";
import tick from "../assets/tick.svg";
import {GridCellMatrix} from "../classes/GridCellMatrix.ts";

function rowCellOvered(matrixRow: number, labelRow: number, overedCell: number[]): boolean {
  if (matrixRow === 0)
    return (overedCell[0] === 0 || overedCell[0] === 3 || overedCell[0] === 5) && overedCell[1] === labelRow;
  else if (matrixRow === 1)
    return (overedCell[0] === 1 || overedCell[0] === 4) && overedCell[1] === labelRow;
  else if (matrixRow === 2)
    return overedCell[0] === 2 && overedCell[1] === labelRow;
  else
    return false;
}

function columnCellOvered(matrixColumn: number, labelColumn: number, overedCell: number[]): boolean {
  if (matrixColumn === 3)
    return (overedCell[0] === 0 || overedCell[0] === 1 || overedCell[0] === 2) && overedCell[2] === labelColumn;
  else if (matrixColumn === 4)
    return (overedCell[0] === 3 || overedCell[0] === 4 && overedCell[2]) === labelColumn;
  else if (matrixColumn === 5)
    return overedCell[0] === 5 && overedCell[2] === labelColumn;
  else
    return false;
}

export const generateLeftSide = (header: string, labels: string[], backgroundColor: string, color: string, row: number, overedCell: number[], setOveredCell: (arg0: number[]) => void): ReactElement => (
  <table>
    <tbody className="left-side" onPointerEnter={() => setOveredCell([-1, -1, -1])}>
      <tr>
        <th style={{background: backgroundColor, color: color}} rowSpan={5}><span>{header}</span></th>
        {rowCellOvered(row, 0, overedCell) ? <td className="overed">{labels[0]}</td> : <td>{labels[0]}</td>}
      </tr>
      <tr>
        {rowCellOvered(row, 1, overedCell) ? <td className="overed">{labels[1]}</td> : <td>{labels[1]}</td>}
      </tr>
      <tr>
        {rowCellOvered(row, 2, overedCell) ? <td className="overed">{labels[2]}</td> : <td>{labels[2]}</td>}
      </tr>
      <tr>
        {rowCellOvered(row, 3, overedCell) ? <td className="overed">{labels[3]}</td> : <td>{labels[3]}</td>}
      </tr>
      <tr>
        {rowCellOvered(row, 4, overedCell) ? <td className="overed">{labels[4]}</td> : <td>{labels[4]}</td>}
      </tr>
    </tbody>
  </table>
);

export const generateTopSide = (header: string, labels: string[], backgroundColor: string, color: string, column: number, overedCell: number[], setOveredCell: (arg0: number[]) => void): ReactElement => (
  <table>
    <tbody className="top-side" onPointerEnter={() => setOveredCell([-1, -1, -1])}>
    <tr>
      <th style={{background: backgroundColor, color: color}} colSpan={5}>{header}</th>
    </tr>
    <tr>
      {columnCellOvered(column, 0, overedCell) ? <td className="overed"><span>{labels[0]}</span></td> :
        <td><span>{labels[0]}</span></td>}
      {columnCellOvered(column, 1, overedCell) ? <td className="overed"><span>{labels[1]}</span></td> :
        <td><span>{labels[1]}</span></td>}
      {columnCellOvered(column, 2, overedCell) ? <td className="overed"><span>{labels[2]}</span></td> :
        <td><span>{labels[2]}</span></td>}
      {columnCellOvered(column, 3, overedCell) ? <td className="overed"><span>{labels[3]}</span></td> :
        <td><span>{labels[3]}</span></td>}
      {columnCellOvered(column, 4, overedCell) ? <td className="overed"><span>{labels[4]}</span></td> :
        <td><span>{labels[4]}</span></td>}
    </tr>
    </tbody>
  </table>
);

function getCellContent(matrix: number, row: number, column: number, puzzleGrid: GridCellMatrix[]): ReactElement {
  const cellState = puzzleGrid[matrix].getCellState(row, column);

  if (cellState === CellState.EMPTY)
    return <></>;
  else if (cellState === CellState.CROSSED || cellState === CellState.DISABLED || cellState === CellState.CROSSED_AND_DISABLED)
    return <div><img src={cross} alt="Red cross"/></div>
  else if (cellState === CellState.TICKED)
    return <div><img src={tick} alt="Green tick"/></div>
  else
    throw new Error("Invalid cell state");
}

export const generateClickableMatrix = (matrix: number, height: number, width: number, puzzleGrid: GridCellMatrix[],
                                        setOveredCell: (arg0: number[]) => void, setPuzzleGrid: (arg0: GridCellMatrix[]) => void,
                                        updateAnswer: (arg0: number, arg1: number, arg2: number, arg3: boolean) => void): ReactElement => (
  <table>
    <tbody className="clickable">
    {(() => {
      const rows: Array<ReactElement> = [];

      for (let i = 0; i < height; i++) {
        const columns: Array<ReactElement> = [];

        for (let j = 0; j < width; j++)
          columns.push(<td key={j}
                           onPointerEnter={() => setOveredCell([matrix, i, j])}
                           onClick={() => {
                             const wasTicked = puzzleGrid[matrix].getCellState(i, j) === CellState.TICKED;

                             puzzleGrid[matrix].changeCellState(i, j);
                             setPuzzleGrid([...puzzleGrid]);

                             if (matrix === 0 || matrix === 3 || matrix === 5) {
                               if (puzzleGrid[matrix].getCellState(i, j) === CellState.TICKED)
                                 updateAnswer(matrix, i, j, true);
                               else if (wasTicked)
                                 updateAnswer(matrix, i, j, false)
                             }
                           }}>
            {getCellContent(matrix, i, j, puzzleGrid)}
          </td>);

        rows.push(<tr key={i}>{columns}</tr>);
      }

      return rows;
    })()}
    </tbody>
  </table>);

export function generateVoidMatrix(height: number, width: number, setOveredCell: (arg0: number[]) => void): ReactElement {
  return (
    <tbody className="void" onPointerEnter={() => setOveredCell([-1, -1, -1])}>
    {(() => {
      const rows: Array<ReactElement> = [];

      for (let i = 0; i < height; i++) {
        const columns: Array<ReactElement> = [];

        for (let j = 0; j < width; j++)
          columns.push(<td key={j}></td>);

        rows.push(<tr key={i}>{columns}</tr>);
      }

      return rows;
    })()}
    </tbody>
  );
}