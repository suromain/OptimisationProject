// import {useEffect, useState} from 'react';
// import {useNavigate} from "react-router-dom";
// import sdk from "../utils/sdk.ts";
// import {PersonalComputerSolution} from "../types/PersonalComputerSolution.ts";

import "../styles/grid.css"
// import tick from "../assets/tick.svg"
// import cross from "../assets/cross.svg"
import {ReactElement, useEffect, useState} from "react";
// import {GridCellMatrix} from "../types/GridCellMatrix.ts";


function PersonalComputer() {
  // Index 0-2: first column, index 3-4: second column, index 6: third column
  const height: number = 5;
  const width: number = 5;
  // const [puzzleGrid]
  //   = useState<Array<GridCellMatrix>>(new Array<GridCellMatrix>(6).fill(new GridCellMatrix(height, width)));

  const [overTrigger, setOverTrigger] = useState<boolean>(false);
  const [overedCell, setOveredCell] = useState<Array<number>>([-1, -1, -1]);

  useEffect(() => {
    if (overTrigger) {
      console.log("overed");
      setOverTrigger(false);
    }
  }, [overTrigger]);

  function rowCellOvered(matrixRow: number, labelRow: number): boolean {
    if (matrixRow === 0)
      return (overedCell[0] === 0 || overedCell[0] === 3 || overedCell[0] === 5) && overedCell[1] === labelRow;
    else if (matrixRow === 1)
      return (overedCell[0] === 1 || overedCell[0] === 4) && overedCell[1] === labelRow;
    else if (matrixRow === 2)
      return overedCell[0] === 2 && overedCell[1] === labelRow;
    else
      return false;
  }

  function columnCellOvered(matrixColumn: number, labelColumn: number): boolean {
    if (matrixColumn === 3)
      return (overedCell[0] === 0 || overedCell[0] === 1 || overedCell[0] === 2) && overedCell[2] === labelColumn;
    else if (matrixColumn === 4)
      return (overedCell[0] === 3 || overedCell[0] === 4 && overedCell[2]) === labelColumn;
    else if (matrixColumn === 5)
      return overedCell[0] === 5 && overedCell[2] === labelColumn;
    else
      return false;
  }

  function generateLeftSide(header: string, labels: string[], row: number): ReactElement {
    return (
      <tbody className="left-side" onPointerEnter={() => setOveredCell([-1, -1, -1])}>
        <tr>
          <th rowSpan={5}><span>{header}</span></th>
          {rowCellOvered(row, 0) ? <td className="overed">{labels[0]}</td> : <td>{labels[0]}</td>}
        </tr>
        <tr>
          {rowCellOvered(row, 1) ? <td className="overed">{labels[1]}</td> : <td>{labels[1]}</td>}
        </tr>
        <tr>
          {rowCellOvered(row, 2) ? <td className="overed">{labels[2]}</td> : <td>{labels[2]}</td>}
        </tr>
        <tr>
          {rowCellOvered(row, 3) ? <td className="overed">{labels[3]}</td> : <td>{labels[3]}</td>}
        </tr>
        <tr>
          {rowCellOvered(row, 4) ? <td className="overed">{labels[4]}</td> : <td>{labels[4]}</td>}
        </tr>
      </tbody>
    );
  }

  function generateTopSide(header: string, labels: string[], column: number): ReactElement {
    return (
      <tbody className="top-side" onPointerEnter={() => setOveredCell([-1, -1, -1])}>
        <tr>
          <th colSpan={5}>{header}</th>
        </tr>
        <tr>
          {columnCellOvered(column, 0) ? <td className="overed"><span>{labels[0]}</span></td> : <td><span>{labels[0]}</span></td>}
          {columnCellOvered(column, 1) ? <td className="overed"><span>{labels[1]}</span></td> : <td><span>{labels[1]}</span></td>}
          {columnCellOvered(column, 2) ? <td className="overed"><span>{labels[2]}</span></td> : <td><span>{labels[2]}</span></td>}
          {columnCellOvered(column, 3) ? <td className="overed"><span>{labels[3]}</span></td> : <td><span>{labels[3]}</span></td>}
          {columnCellOvered(column, 4) ? <td className="overed"><span>{labels[4]}</span></td> : <td><span>{labels[4]}</span></td>}
        </tr>
      </tbody>
    );
  }

  function generateClickableMatrix(matrix: number): ReactElement {
    return (
      <tbody className="clickable">
        {(() => {
          const rows: Array<ReactElement> = [];

          for (let i = 0; i < height; i++) {
            const columns: Array<ReactElement> = [];

            for (let j = 0; j < width; j++)
              columns.push(<td onPointerEnter={() => setOveredCell([matrix, i, j])}></td>);

            rows.push(<tr>{columns}</tr>);
          }

          return rows;
        })()}
      </tbody>
    );
  }

  function generateVoidMatrix(): ReactElement {
    return (
      <tbody className="void" onPointerEnter={() => setOveredCell([-1, -1, -1])}>
        {(() => {
          const rows: Array<ReactElement> = [];

          for (let i = 0; i < height; i++) {
            const columns: Array<ReactElement> = [];

            for (let j = 0; j < width; j++)
              columns.push(<td></td>);

            rows.push(<tr>{columns}</tr>);
          }

          return rows;
        })()}
      </tbody>
    );
  }

  return (
    <div>
      <div className="main-grid" onPointerLeave={() => setOveredCell([-1, -1, -1])}>
        <table>
          <tbody className="void" onPointerEnter={() => setOveredCell([-1, -1, -1])}/>
          {generateLeftSide("Monitor", ["13'", "15'", "15.6'", "21.5'", "27'"], 0)}
          {generateLeftSide("Price", ["$ 699,00", "$ 999,00", "$ 1.149,00", "$ 1.349,00", "$ 1.649,00"], 1)}
          {generateLeftSide("Hard Disk", ["250 Gb", "320 Gb", "500 Gb", "750 Gb", "1024 Gb"], 2)}
        </table>
        <table>
          {generateTopSide("Processor", ["2.0 MHZ", "2.3 MHZ", "2.5 MHZ", "2.7 MHZ", "3.1 MHZ"], 3)}
          {generateClickableMatrix(0)}
          {generateClickableMatrix(1)}
          {generateClickableMatrix(2)}
        </table>
        <table>
          {generateTopSide("Hard Disk", ["250 Gb", "320 Gb", "500 Gb", "750 Gb", "1024 Gb"], 4)}
          {generateClickableMatrix(3)}
          {generateClickableMatrix(4)}
          {generateVoidMatrix()}
        </table>
        <table>
          {generateTopSide("Price", ["$ 699,00", "$ 999,00", "$ 1.149,00", "$ 1.349,00", "$ 1.649,00"], 5)}
          {generateClickableMatrix(5)}
          {generateVoidMatrix()}
          {generateVoidMatrix()}
        </table>
      </div>
    </div>
  )
}

export default PersonalComputer;

