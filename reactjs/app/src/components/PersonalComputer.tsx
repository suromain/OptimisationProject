import "../styles/grid.css"
import "../styles/logicPuzzle.css"
import tick from "../assets/tick.svg"
import cross from "../assets/cross.svg"
import {ReactElement, useEffect, useState} from "react";
import {GridCellMatrix} from "../classes/GridCellMatrix.ts";
import {CellState} from "../types/CellState.ts";
import {HardDisks, Monitors, PersonalComputerSolution, Prices, Processors} from "../types/PersonalComputerSolution.ts";
import sdk from "../utils/sdk.ts";
import {useLoaderData} from "react-router-dom";
import {ConstraintsResponse} from "../types/SolverResponse.ts";


function PersonalComputer() {
  const height: number = 5;
  const width: number = 5;

  const monitors: Array<Monitors> = [130, 150, 156, 215, 270];
  const processors: Array<Processors> = [20, 23, 25, 27, 31];
  const hardDisks: Array<HardDisks> = [250, 320, 500, 750, 1024];
  const prices: Array<Prices> = [699, 999, 1149, 1349, 1649];

  const monitorsLabels: Array<string> = ["13'", "15'", "15.6'", "21.5'", "27'"];
  const processorsLabels: Array<string> = ["2.0 MHZ", "2.3 MHZ", "2.5 MHZ", "2.7 MHZ", "3.1 MHZ"];
  const hardDisksLabels: Array<string> = ["250 Gb", "320 Gb", "500 Gb", "750 Gb", "1024 Gb"];
  const pricesLabels: Array<string> = ["$ 699,00", "$ 999,00", "$ 1.149,00", "$ 1.349,00", "$ 1.649,00"];

  const [answer, setAnswer] = useState<PersonalComputerSolution>((
    {
      monitors: monitors,
      processors: new Array<Processors>(5).fill(null),
      hardDisks: new Array<HardDisks>(5).fill(null),
      prices: new Array<Prices>(5).fill(null)
    }
  ));

  // Index 0-2: first column, index 3-4: second column, index 6: third column
  const [puzzleGrid, setPuzzleGrid]
    = useState<Array<GridCellMatrix>>(() => {
    const puzzleGrid = new Array<GridCellMatrix>(6);

    for (let i = 0; i < 6; i++)
      puzzleGrid[i] = new GridCellMatrix(height, width);

    return puzzleGrid;
  });

  const [overedCell, setOveredCell] = useState<Array<number>>([-1, -1, -1]);
  const [checkAnswer, setCheckAnswer] = useState<boolean>(false);

  const constraintsResponse: ConstraintsResponse = useLoaderData() as ConstraintsResponse;
  const constraints = constraintsResponse.constraints;
  const [constraintsOverlined, setConstraintsOverlined]
    = useState<Array<boolean>>(new Array<boolean>(constraints.length).fill(false));

  useEffect(() => {
    if (checkAnswer) {
      const api = sdk.personalComputer;
      const response = api.checkSolution(answer);
      response.then((result) => {
        console.log(result)

        if (result.every((value) => value.success)) {
          window.confirm("Congratulations! You solved the puzzle!");
          return;
        }
        else {
          window.confirm("You made a mistake. Try again!");
        }
      }).catch((json) => {
        console.log(json.response.status + " " + json.response.message)
      }).finally(() => {
        setCheckAnswer(false);
      });
    }
  }, [answer, checkAnswer]);

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

  function getCellContent(matrix: number, row: number, column: number): ReactElement {
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

  function updateAnswer(matrix: number, row: number, column: number, ticked: boolean) {
    if (ticked) {
      if (matrix == 0)
        answer.processors[row] = processors[column];
      else if (matrix == 3)
        answer.hardDisks[row] = hardDisks[column];
      else if (matrix == 5)
        answer.prices[row] = prices[column];
    }
    else {
      if (matrix == 0)
        answer.processors[row] = null;
      else if (matrix == 3)
        answer.hardDisks[row] = null;
      else if (matrix == 5)
        answer.prices[row] = null;
    }

    setAnswer({...answer});
  }

  function generateClickableMatrix(matrix: number): ReactElement {
    return (
      <tbody className="clickable">
        {(() => {
          const rows: Array<ReactElement> = [];

          for (let i = 0; i < height; i++) {
            const columns: Array<ReactElement> = [];

            for (let j = 0; j < width; j++)
              columns.push(<td  key={j}
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
                {getCellContent(matrix, i, j)}
              </td>);

            rows.push(<tr key={i}>{columns}</tr>);
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
              columns.push(<td key={j}></td>);

            rows.push(<tr key={i}>{columns}</tr>);
          }

          return rows;
        })()}
      </tbody>
    );
  }

  return (
    <div className="main-container">
      <div className="body-container">
        <div className="main-grid" onPointerLeave={() => setOveredCell([-1, -1, -1])}>
          <table>
            <tbody className="void" onPointerEnter={() => setOveredCell([-1, -1, -1])}/>
            {generateLeftSide("Monitor", monitorsLabels, 0)}
            {generateLeftSide("Price", pricesLabels, 1)}
            {generateLeftSide("Hard Disk", hardDisksLabels, 2)}
          </table>
          <table>
            {generateTopSide("Processor", processorsLabels, 3)}
            {generateClickableMatrix(0)}
            {generateClickableMatrix(1)}
            {generateClickableMatrix(2)}
          </table>
          <table>
            {generateTopSide("Hard Disk", hardDisksLabels, 4)}
            {generateClickableMatrix(3)}
            {generateClickableMatrix(4)}
            {generateVoidMatrix()}
          </table>
          <table>
            {generateTopSide("Price", pricesLabels, 5)}
            {generateClickableMatrix(5)}
            {generateVoidMatrix()}
            {generateVoidMatrix()}
          </table>
        </div>

        <div className="hints">
          <div>
            {constraints.map((constraint): ReactElement => {
              const index = constraints.indexOf(constraint);
              const overlined = constraintsOverlined[index];

              if (!overlined)
                return <p key={index} onClick={() => {
                  constraintsOverlined[index] = true;
                  setConstraintsOverlined([...constraintsOverlined]);
                }}>{constraint}</p>;
              else
                return <></>
            })}
          </div>
          <div>
            {constraints.map((constraint): ReactElement => {
              const index = constraints.indexOf(constraint);
              const overlined = constraintsOverlined[index];

              if (overlined)
                return <p className="overlined" key={index} onClick={() => {
                  constraintsOverlined[index] = false;
                  setConstraintsOverlined([...constraintsOverlined]);
                }}>{constraint}</p>;
              else
                return <></>
            })}
          </div>
        </div>
      </div>

      <div className="answer-container">
        <table>
          <tbody>
          <tr>
            <th>Monitor</th>
            <th>Processor</th>
            <th>Hard Disk</th>
            <th>Price</th>
          </tr>
          <tr>
            <td>{monitorsLabels[monitors.indexOf(answer.monitors[0])]}</td>
            <td>{processorsLabels[processors.indexOf(answer.processors[0])]}</td>
            <td>{hardDisksLabels[hardDisks.indexOf(answer.hardDisks[0])]}</td>
            <td>{pricesLabels[prices.indexOf(answer.prices[0])]}</td>
          </tr>
          <tr>
            <td>{monitorsLabels[monitors.indexOf(answer.monitors[1])]}</td>
            <td>{processorsLabels[processors.indexOf(answer.processors[1])]}</td>
            <td>{hardDisksLabels[hardDisks.indexOf(answer.hardDisks[1])]}</td>
            <td>{pricesLabels[prices.indexOf(answer.prices[1])]}</td>
          </tr>
          <tr>
            <td>{monitorsLabels[monitors.indexOf(answer.monitors[2])]}</td>
            <td>{processorsLabels[processors.indexOf(answer.processors[2])]}</td>
            <td>{hardDisksLabels[hardDisks.indexOf(answer.hardDisks[2])]}</td>
            <td>{pricesLabels[prices.indexOf(answer.prices[2])]}</td>
          </tr>
          <tr>
            <td>{monitorsLabels[monitors.indexOf(answer.monitors[3])]}</td>
            <td>{processorsLabels[processors.indexOf(answer.processors[3])]}</td>
            <td>{hardDisksLabels[hardDisks.indexOf(answer.hardDisks[3])]}</td>
            <td>{pricesLabels[prices.indexOf(answer.prices[3])]}</td>
          </tr>
          </tbody>
        </table>

        <div className="button">
          {answer.processors.includes(null) || answer.hardDisks.includes(null) || answer.prices.includes(null)
            ? <button disabled>Check answer</button>
            : <button onClick={() => {
              setCheckAnswer(true);
            }}>Check answer</button>}
        </div>
      </div>
    </div>
  )
}

export default PersonalComputer;
