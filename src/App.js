import React, { useState } from "react";
import "./App.css";
function App(props) {
  const [enteredA, setEnteredA] = useState("-4");
  const [enteredB, setEnteredB] = useState("12");
  const [enteredD, setEnteredD] = useState("0.001");
  const [enteredN, setEnteredN] = useState("10");
  const [enteredT, setEnteredT] = useState("100");
  const [data, setData] = useState([]);

  const aChangeHandler = (event) => {
    setEnteredA(event.target.value);
  };
  const bChangeHandler = (event) => {
    setEnteredB(event.target.value);
  };
  const dChangeHandler = (event) => {
    setEnteredD(event.target.value);
  };
  const nChangeHandler = (event) => {
    setEnteredN(event.target.value);
  };
  const tChangeHandler = (event) => {
    setEnteredT(event.target.value);
  };

  const a = enteredA;
  const b = enteredB;
  const n = enteredN;
  const t = enteredT;
  const d = enteredD;
  const l = Math.ceil(Math.log2((b - a) / d + 1));

  function realToInt(xReal) {
    return (1 / (b - a)) * (xReal - a) * (Math.pow(2, l) - 1);
  }
  function intToBin(xInt) {
    return mask(xInt.toString(2), l);
  }

  function binToInt(xBin) {
    return parseInt(xBin, 2);
  }

  function intToreal(xI) {
    const u = ((b - a) * xI) / (Math.pow(2, l) - 1);
    return u;
  }
  function mask(bin, l) {
    var xbin = "" + bin;
    while (xbin.length < l) {
      xbin = "0" + xbin;
    }

    return xbin;
  }
  function wart(a, b, d) {
    const dataTable = [];

    a = Math.ceil(a);
    b = Math.floor(b);

    if (a > b) {
      alert("Nieporawny zakres");
      window.location.reload(true);
    }

    let prec = d.length - 2;
    d = parseFloat(d);
    if (dataTable.length > n - 1) {
      dataTable.length = 0;
    }
    for (let i = 1; i <= n; i++) {
      const h = Math.random() * (b - a);
      const xR = h + a;
      const xxR = parseFloat(xR);
      const xReal = xxR.toFixed(prec);
      const xInt = parseInt(realToInt(xReal));
      const xBin = intToBin(xInt);
      const xI = parseInt(binToInt(xBin));
      const xRr = intToreal(xI) + a;
      const xRrr = parseFloat(xRr.toFixed(prec));
      const f = (xRrr % 1) * (Math.cos(20 * Math.PI * xRrr) - Math.sin(xRrr));

      dataTable.push({
        lp: i,
        xreal: xReal,
        xint: xInt,
        xbin: xBin,
        xi: xI,
        xrrr: xRrr,
        f: f,
      });
    }
    console.log(dataTable);
    return dataTable;
  }
  const dataChangeHandler = (event) => {
    const dataTable = wart(a, b, d);
    setData(dataTable);
  };

  const submmitHandler = (event) => {
    event.preventDefault();

    const formValue = {
      data: wart(a, b, d),
    };
    console.log(formValue);
  };
  return (
    <div className="App">
      <header className="App-header">
        <div className="Form-wrapper">
          <form onSubmit={submmitHandler}>
            <label>Początek przedziału a:</label>
            <input
              type="number"
              value={enteredA}
              onChange={aChangeHandler}
            ></input>
            <label>Koniec przedziału b:</label>
            <input
              type="number"
              value={enteredB}
              onChange={bChangeHandler}
            ></input>
            <label>Dokładność: d</label>
            <select value={enteredD} onChange={dChangeHandler}>
              <option type="number" value="0.1">
                0,1
              </option>
              <option type="number" value="0.01">
                0,01
              </option>
              <option type="number" selected value="0.001">
                0,001
              </option>
              <option type="number" value="0.0001">
                0,0001
              </option>
            </select>
            <label>Liczba osobników N:</label>
            <input
              type="number"
              value={enteredN}
              onChange={nChangeHandler}
            ></input>
            <label>Liczba pokoleń T:</label>
            <input
              type="number"
              value={enteredT}
              onChange={tChangeHandler}
            ></input>
            <button type="submit" onClick={dataChangeHandler}>
              start
            </button>
          </form>
        </div>
        <div className="Table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Lp</th>
                <th>xReal</th>
                <th>xInt</th>
                <th>xBin</th>
                <th>xInt</th>
                <th>xReal</th>
                <th>f(x)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val.lp}</td>
                    <td>{val.xreal}</td>
                    <td>{val.xint}</td>
                    <td>{val.xbin}</td>
                    <td>{val.xi}</td>
                    <td>{val.xrrr}</td>
                    <td>{val.f}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </header>
    </div>
  );
}
export default App;
