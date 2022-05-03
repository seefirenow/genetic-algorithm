import React, { useState } from "react";
import "./App.css";
function App(props) {
  const [enteredA, setEnteredA] = useState("-4");
  const [enteredB, setEnteredB] = useState("12");
  const [enteredD, setEnteredD] = useState("0.001");
  const [enteredN, setEnteredN] = useState("10");
  const [enteredT, setEnteredT] = useState("100");
  const [data, setData] = useState([]);
  const [dataPi, setDatPi] = useState([]);
  const [checkedMax, setCheckedMax] = React.useState(true);
  const [checkedMin, setCheckedMin] = React.useState(false);

  const handleChangeOne = () => {
    setCheckedMax(!checkedMax);
    setCheckedMin(!checkedMin);
  };
  const handleChangeTwo = () => {
    setCheckedMin(!checkedMin);
    setCheckedMax(!checkedMax);
  };
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

  function lp(n) {
    const arrayLp = [];
    if (data.length > n - 1) {
      data.length = 0;
    }
    for (let i = 1; i <= n; i++) {
      arrayLp[i - 1] = i;
    }
    return arrayLp;
  }
  function xreal(a, b, d) {
    if (dataPi.length > n - 1) {
      dataPi.length = 0;
    }
    const arrayX = [];
    a = Math.ceil(a);
    b = Math.floor(b);

    if (a > b) {
      alert("Nieporawny zakres");
      window.location.reload(true);
    }

    let prec = d.length - 2;
    d = parseFloat(d);
    if (arrayX.length > n - 1) {
      arrayX.length = 0;
    }

    for (let i = 0; i < n; i++) {
      const h = Math.random() * (b - a);
      const xR = h + a;
      const xxR = parseFloat(xR);
      const xReal = xxR.toFixed(prec);
      arrayX.push(xReal);
    }
    return arrayX;
  }

  function fun(xReal) {
    const dataFun = [];

    for (let i = 1; i <= xReal.length; i++) {
      const x = parseFloat(xReal[i - 1]);
      const funkcja = (x % 1) * (Math.cos(20 * Math.PI * x) - Math.sin(x));
      dataFun.push(funkcja);
    }

    return dataFun;
  }
  function gun(min, max, f, d) {
    d = parseFloat(d);
    const arrayG = [];
    if (checkedMax === true) {
      for (let i = 1; i <= f.length; i++) {
        const g = f[i - 1] - min + d;
        arrayG.push(g);
      }
      return arrayG;
    } else {
      for (let i = 1; i <= f.length; i++) {
        const g = f[i - 1] - max - d;
        arrayG.push(g);
      }
      return arrayG;
    }
  }
  function gSum(g) {
    let gSum = 0;
    for (let i = 0; i < g.length; i++) {
      gSum += g[i];
    }
    return gSum;
  }
  function pii(g, sumG) {
    const arrayPI = [];
    for (let i = 0; i < g.length; i++) {
      const pi = g[i] / sumG;
      arrayPI.push(pi);
    }
    return arrayPI;
  }

  function qu(pi) {
    const arrayQu = [];
    let qi = 0;
    for (var i = 0; i < pi.length; i++) {
      if (i === 0) {
        qi = pi[i];
        arrayQu.push(qi);
      } else {
        qi = arrayQu[i - 1] + pi[i];
        arrayQu.push(qi);
      }
    }

    return arrayQu;
  }
  function randR() {
    const arrayR = [];
    for (let i = 0; i < n; i++) {
      const rR = Math.random() * (1 - 0) + 0;
      const r = parseFloat(rR);
      arrayR.push(r);
    }
    return arrayR;
  }

  function xrealtwo(n, q, r, x) {
    const arrayxtwo = [];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (q[j] >= r[i]) {
          arrayxtwo[i] = parseFloat(x[j]);
          break;
        }
      }
    }
    return arrayxtwo;
  }

  const dataHandler = (event) => {
    const tab = [];
    const lpi = lp(n);
    const x = xreal(a, b, d, n);
    const f = fun(x);
    const min = Math.min.apply(Math, f);
    const max = Math.max.apply(Math, f);
    const g = gun(min, max, f, d);
    const sumaG = gSum(g);
    const pi = pii(g, sumaG);
    const q = qu(pi);
    const r = randR();
    const xreltwo = xrealtwo(n, q, r, x);
    const ftwo = fun(xreltwo);
    for (let i = 0; i < n; i++) {
      tab[i] = {
        lp: lpi[i],
        x: x[i],
        f: f[i],
        g: g[i],
        pi: pi[i],
        q: q[i],
        r: r[i],
        xtwo: xreltwo[i],
        ftwo: ftwo[i],
      };
    }
    setData(tab);
    console.log(tab);
  };

  const submmitHandler = (event) => {
    event.preventDefault();
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
            <div>
              <label>
                <input
                  type="radio"
                  value={checkedMax}
                  checked={checkedMax}
                  onChange={handleChangeOne}
                />
                MAX
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value={checkedMin}
                  checked={checkedMin}
                  onChange={handleChangeTwo}
                />
                MIN
              </label>
            </div>

            <button type="submit" onClick={dataHandler}>
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
                <th>f(x)</th>
                <th>g(x)</th>
                <th>p(i)</th>
                <th>q</th>
                <th>r</th>
                <th>xReal*</th>
                <th>f(x)*</th>
              </tr>
            </thead>
            <tbody>
              {data.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val.lp}</td>
                    <td>{val.x}</td>
                    <td>{val.f}</td>
                    <td>{val.g}</td>
                    <td>{val.pi}</td>
                    <td>{val.q}</td>
                    <td>{val.r}</td>
                    <td>{val.xtwo}</td>
                    <td>{val.ftwo}</td>
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
