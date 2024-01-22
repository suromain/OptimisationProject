import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";


function Zebra() {

    const [tshirts, setTShirts] = useState('')
    const [names, setNames] = useState('')
    const [surnames, setSurnames] = useState('')
    const [pastas, setPastas] = useState('')
    const [wines, setWines] = useState('')
    const [ages, setAges] = useState('')

    const [submit, setSubmit] = useState(false)
    const [answer, setAnswer] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        if (submit) {
            const fetchData = async function fetchData() {
                // Put in the request the file and its name

                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        tshirts: tshirts, names: names, surnames: surnames,
                        pastas: pastas, wines: wines, ages: ages
                    })
                };

                // Send it to Spring server
                fetch("http://localhost:5000/zebra", requestOptions).then(async (response) => {
                    if (response.status === 200) {
                        console.log(response)
                        const answer = response.json()
                        setAnswer(await answer)
                        console.log(answer)
                    } else {
                        navigate("/error")
                        // alertify.error('Error, problem to upload the file on the database.')
                    }
                }).catch((err) => {
                    console.log(err);
                }).finally(() => {
                    setSubmit(false)
                })

                // At the end, pass the loading parameter to false
            }

            fetchData().then(() => {})
        }
    }, [ages, names, navigate, pastas, submit, surnames, tshirts, wines])

    return (
        <div>
            <div>
                <label> T-shirts: </label>
                <input type="text" value={tshirts} onChange={(e) => setTShirts(e.target.value)}/>
            </div>
            <div>
                <label> Names: </label>
                <input type="text" value={names} onChange={(e) => setNames(e.target.value)}/>
            </div>
            <div>
                <label> Surnames: </label>
                <input type="text" value={surnames} onChange={(e) => setSurnames(e.target.value)}/>
            </div>
            <div>
                <label> Pastas: </label>
                <input type="text" value={pastas} onChange={(e) => setPastas(e.target.value)}/>
            </div>
            <div>
                <label> Wines: </label>
                <input type="text" value={wines} onChange={(e) => setWines(e.target.value)}/>
            </div>
            <div>
                <label> Ages: </label>
                <input type="text" value={ages} onChange={(e) => setAges(e.target.value)}/>
            </div>
            <div>
                <button onClick={() => setSubmit(true)}> Submit </button>
                <p> {answer} </p>
            </div>
        </div>
    )
}

// export async function getFilesInfo() {
//   const requestOptions = {
//     method: 'GET'
//   };
//
//   const response = await fetch("http://localhost:9000/file/list", requestOptions);
//   const json = await response.json();
//
//   if (response.status === 200) {
//     return {fileList: json, userId: json};
//   } else {
//     return {status: json.status, message: json.message};
//   }
// }

export default Zebra;

