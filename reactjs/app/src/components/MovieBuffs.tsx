import "../styles/grid.css"
import "../styles/logicPuzzle.css"
import sdk from "../utils/sdk.ts";
import {ReactElement, useEffect, useState} from "react";
import {GridCellMatrix} from "../classes/GridCellMatrix.ts";
import {useLoaderData} from "react-router-dom";
import {ConstraintsResponse} from "../types/SolverResponse.ts";
import {generateLeftSide, generateTopSide, generateClickableMatrix, generateVoidMatrix} from "../utils/LogicPuzzleCreator.tsx";
import {Days, Films, MovieBuffsSolution, Names, Times} from "../types/MovieBuffsSolution.ts";


function PersonalComputer() {
  const height: number = 5;
  const width: number = 5;

  const names: Array<Names> = ["Jessica", "Laurie", "Mark", "Mary", "Sally"];
  const films: Array<Films> = ["Minutes88", "DonnieBrasco", "Scarecrow", "Scarface", "TheRecruit"];
  const days: Array<Days> = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const times: Array<Times> = [35, 40, 80, 90, 105];

  const namesLabels: Array<string> = ["Jessica", "Laurie", "Mark", "Mary", "Sally"];
  const filmsLabels: Array<string> = ["88 Minutes", "Donnie Brasco", "Scarecrow0", "Scarface", "The Recruit"];
  const daysDisksLabels: Array<string> = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timesLabels: Array<string> = ["7:35 pm", "7:40 pm", "8:20 pm", "8:30 pm", "8:45 pm"];

  const [answer, setAnswer] = useState<MovieBuffsSolution>((
    {
      members: names,
      movies: new Array<Films>(5).fill(null),
      days: new Array<Days>(5).fill(null),
      hours: new Array<Times>(5).fill(null)
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
      const api = sdk.movieBuffs;
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
        answer.movies[row] = films[column];
      else if (matrix == 3)
        answer.days[row] = days[column];
      else if (matrix == 5)
        answer.hours[row] = times[column];
    }
    else {
      if (matrix == 0)
        answer.movies[row] = null;
      else if (matrix == 3)
        answer.days[row] = null;
      else if (matrix == 5)
        answer.hours[row] = null;
    }

    setAnswer({...answer});
  }

  return (
    <div className="main-container">
      <div className="body-container">
        <div className="main-grid" onPointerLeave={() => setOveredCell([-1, -1, -1])}>
          <table>
            <tbody className="void" onPointerEnter={() => setOveredCell([-1, -1, -1])}/>
            {generateLeftSide("Name", namesLabels, 0, overedCell, setOveredCell)}
            {generateLeftSide("Time", timesLabels, 1, overedCell, setOveredCell)}
            {generateLeftSide("Day", daysDisksLabels, 2, overedCell, setOveredCell)}
          </table>
          <table>
            {generateTopSide("Film", filmsLabels, 3, overedCell, setOveredCell)}
            {generateClickableMatrix(0, height, width, puzzleGrid, setOveredCell, setPuzzleGrid, updateAnswer)}
            {generateClickableMatrix(1, height, width, puzzleGrid, setOveredCell, setPuzzleGrid, updateAnswer)}
            {generateClickableMatrix(2, height, width, puzzleGrid, setOveredCell, setPuzzleGrid, updateAnswer)}
          </table>
          <table>
            {generateTopSide("Day", daysDisksLabels, 4, overedCell, setOveredCell)}
            {generateClickableMatrix(3, height, width, puzzleGrid, setOveredCell, setPuzzleGrid, updateAnswer)}
            {generateClickableMatrix(4, height, width, puzzleGrid, setOveredCell, setPuzzleGrid, updateAnswer)}
            {generateVoidMatrix(height, width, setOveredCell)}
          </table>
          <table>
            {generateTopSide("Time", timesLabels, 5, overedCell, setOveredCell)}
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
              <th>Name</th>
              <th>Film</th>
              <th>Day</th>
              <th>Time</th>
            </tr>
            <tr>
              <td>{namesLabels[names.indexOf(answer.members[0])]}</td>
              <td>{filmsLabels[films.indexOf(answer.movies[0])]}</td>
              <td>{daysDisksLabels[days.indexOf(answer.days[0])]}</td>
              <td>{timesLabels[times.indexOf(answer.hours[0])]}</td>
            </tr>
            <tr>
              <td>{namesLabels[names.indexOf(answer.members[1])]}</td>
              <td>{filmsLabels[films.indexOf(answer.movies[1])]}</td>
              <td>{daysDisksLabels[days.indexOf(answer.days[1])]}</td>
              <td>{timesLabels[times.indexOf(answer.hours[1])]}</td>
            </tr>
            <tr>
              <td>{namesLabels[names.indexOf(answer.members[2])]}</td>
              <td>{filmsLabels[films.indexOf(answer.movies[2])]}</td>
              <td>{daysDisksLabels[days.indexOf(answer.days[2])]}</td>
              <td>{timesLabels[times.indexOf(answer.hours[2])]}</td>
            </tr>
            <tr>
              <td>{namesLabels[names.indexOf(answer.members[3])]}</td>
              <td>{filmsLabels[films.indexOf(answer.movies[3])]}</td>
              <td>{daysDisksLabels[days.indexOf(answer.days[3])]}</td>
              <td>{timesLabels[times.indexOf(answer.hours[3])]}</td>
            </tr>
            <tr>
              <td>{namesLabels[names.indexOf(answer.members[4])]}</td>
              <td>{filmsLabels[films.indexOf(answer.movies[4])]}</td>
              <td>{daysDisksLabels[days.indexOf(answer.days[4])]}</td>
              <td>{timesLabels[times.indexOf(answer.hours[4])]}</td>
            </tr>
          </tbody>
        </table>

        <div className="button">
          {answer.movies.includes(null) || answer.days.includes(null) || answer.hours.includes(null)
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
