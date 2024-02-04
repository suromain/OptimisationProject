import "../styles/grid.css"
import "../styles/puzzle.css"
import "../styles/logicPuzzle.css"
import sdk from "../utils/sdk.ts";
import {ReactElement, useEffect, useState} from "react";
import {GridCellMatrix} from "../classes/GridCellMatrix.ts";
import {HardDisks, Monitors, PersonalComputerSolution, Prices, Processors} from "../types/PersonalComputerSolution.ts";
import {useLoaderData} from "react-router-dom";
import {ConstraintsResponse} from "../types/SolverResponse.ts";
import {generateLeftSide, generateTopSide, generateClickableMatrix, generateVoidMatrix} from "../utils/LogicPuzzleCreator.tsx";


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
      prices: new Array<Prices>(5).fill(null),
      andrews_choice: 3
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

  return (
    <div className="main-container">
      <div className="header-container">
        <div className="title">
          <h1>A New Personal Computer</h1>
        </div>
        <p className="description">
          Andrew has just bought one of these five different models of computers. Each computer has a different screen
          size, processor power, hard drive capacity and price. With the help of the clues, could you figure out which
          computer has been chosen by Andrew?
        </p>
      </div>
      <div className="body-container">
        <div className="main-grid" onPointerLeave={() => setOveredCell([-1, -1, -1])}>
          <table>
            <tbody className="void" onPointerEnter={() => setOveredCell([-1, -1, -1])}/>
            {generateLeftSide("Monitor", monitorsLabels, "white", "black", 0, overedCell, setOveredCell)}
            {generateLeftSide("Price", pricesLabels, "black", "white", 1, overedCell, setOveredCell)}
            {generateLeftSide("Hard Disk", hardDisksLabels, "black", "white", 2, overedCell, setOveredCell)}
          </table>
          <table>
            {generateTopSide("Processor", processorsLabels, "blue", "white", 3, overedCell, setOveredCell)}
            {generateClickableMatrix(0, height, width, puzzleGrid, setOveredCell, setPuzzleGrid, updateAnswer)}
            {generateClickableMatrix(1, height, width, puzzleGrid, setOveredCell, setPuzzleGrid, updateAnswer)}
            {generateClickableMatrix(2, height, width, puzzleGrid, setOveredCell, setPuzzleGrid, updateAnswer)}
          </table>
          <table>
            {generateTopSide("Hard Disk", hardDisksLabels, "red", "white", 4, overedCell, setOveredCell)}
            {generateClickableMatrix(3, height, width, puzzleGrid, setOveredCell, setPuzzleGrid, updateAnswer)}
            {generateClickableMatrix(4, height, width, puzzleGrid, setOveredCell, setPuzzleGrid, updateAnswer)}
            {generateVoidMatrix(height, width, setOveredCell)}
          </table>
          <table>
            {generateTopSide("Price", pricesLabels, "yellow", "black", 5, overedCell, setOveredCell)}
            {generateClickableMatrix(5, height, width, puzzleGrid, setOveredCell, setPuzzleGrid, updateAnswer)}
            {generateVoidMatrix(height, width, setOveredCell)}
            {generateVoidMatrix(height, width, setOveredCell)}
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

          <div className="line"></div>

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
            <th style={{background: "white", color: "black"}}>Monitor</th>
            <th style={{background: "blue", color: "white"}}>Processor</th>
            <th style={{background: "red", color: "white"}}>Hard Disk</th>
            <th style={{background: "yellow", color: "black"}}>Price</th>
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
          <tr>
            <td>{monitorsLabels[monitors.indexOf(answer.monitors[4])]}</td>
            <td>{processorsLabels[processors.indexOf(answer.processors[4])]}</td>
            <td>{hardDisksLabels[hardDisks.indexOf(answer.hardDisks[4])]}</td>
            <td>{pricesLabels[prices.indexOf(answer.prices[4])]}</td>
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
