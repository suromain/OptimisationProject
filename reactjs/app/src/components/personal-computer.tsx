// import {useEffect, useState} from 'react';
// import {useNavigate} from "react-router-dom";
// import sdk from "../utils/sdk.ts";
// import {PersonalComputerSolution} from "../types/PersonalComputerSolution.ts";

import "../styles/grid.css"


function PersonalComputer() {

  // const [processors, setProcessors] = useState('')
  // const [prices, setPrices] = useState('')
  // const [monitors, setMonitors] = useState('')
  // const [hardDisks, setHardDisks] = useState('')
  //
  // const [submit, setSubmit] = useState(false)
  // let answer: PersonalComputerSolution;
  //
  // const navigate = useNavigate();
  //
  // function checkAnswer() {
  //   const api = sdk
  //   api.personalComputer.checkSolution(answer).then((response) => {
  //     console.log(response)
  //   })
  // }

  return (
    <div>
      <table>
        <caption>A New Personal Computer</caption>
        <tbody className="left-side">
          <tr>
            <th rowSpan={5}><p>Monitor</p></th>
            <td>13'</td>
          </tr>
          <tr>
            <td>15'</td>
          </tr>
          <tr>
            <td>15.6'</td>
          </tr>
          <tr>
            <td>21.5</td>
          </tr>
          <tr>
            <td>27'</td>
          </tr>
        </tbody>
        <tbody className="left-side">
          <tr>
            <th rowSpan={5}>Price</th>
            <td>$ 699,00</td>
          </tr>
          <tr>
            <td>$ 999,00</td>
          </tr>
          <tr>
            <td>$ 1.149,00</td>
          </tr>
          <tr>
            <td>$ 1.349,00</td>
          </tr>
          <tr>
            <td>$ 1.649,00</td>
          </tr>
        </tbody>
        <tbody className="left-side">
          <tr>
            <th rowSpan={5}>Hard Disk</th>
            <td>250 Gb</td>
          </tr>
          <tr>
            <td>320 Gb</td>
          </tr>
          <tr>
            <td>500 Gb</td>
          </tr>
          <tr>
            <td>750 Gb</td>
          </tr>
          <tr>
            <td>1024 Gb</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default PersonalComputer;

