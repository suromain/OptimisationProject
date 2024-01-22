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
      <div className="main-grid">
        <table>
          {/*<caption>A New Personal Computer</caption>*/}
          <tbody className="void">
          </tbody>
          <tbody className="left-side">
          <tr>
            <th rowSpan={5}><span>Monitor</span></th>
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
            <th rowSpan={5}><span>Price</span></th>
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
            <th rowSpan={5}><span>Hard Disk</span></th>
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
        <table>
          <tbody className="top-side">
          <tr>
            <th colSpan={5}>Processor</th>
          </tr>
          <tr>
            <td><span>2.0 MHZ</span></td>
            <td><span>2.3 MHZ</span></td>
            <td><span>2.5 MHZ</span></td>
            <td><span>2.7 MHZ</span></td>
            <td><span>3.1 MHZ</span></td>
          </tr>
          </tbody>
          <tbody className="clickable">
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          </tbody>
          <tbody className="clickable">
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          </tbody>
          <tbody className="clickable">
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          </tbody>
        </table>
        <table>
          <tbody className="top-side">
          <tr>
            <th colSpan={5}>Hard Disk</th>
          </tr>
          <tr>
            <td><span>250 Gb</span></td>
            <td><span>320 Gb</span></td>
            <td><span>500 Gb</span></td>
            <td><span>750 Gb</span></td>
            <td><span>1024 Gb</span></td>
          </tr>
          </tbody>
          <tbody className="clickable">
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          </tbody>
          <tbody className="clickable">
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          </tbody>
          <tbody className="void">
          </tbody>
        </table>
        <table>
          <tbody className="top-side">
          <tr>
            <th colSpan={5}>Price</th>
          </tr>
          <tr>
            <td><span>$ 699,00</span></td>
            <td><span>$ 999,00</span></td>
            <td><span>$ 1.148,00</span></td>
            <td><span>$ 1.349,00</span></td>
            <td><span>$ 1.649,00</span></td>
          </tr>
          </tbody>
          <tbody className="clickable">
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          </tbody>
          <tbody className="void">
          </tbody>
          <tbody className="void">
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PersonalComputer;

