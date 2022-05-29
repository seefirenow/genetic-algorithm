import React, { useState } from "react";
import "./App.css";
function App(props) {
  const [enteredA, setEnteredA] = useState("-4");
  const [enteredB, setEnteredB] = useState("12");
  const [enteredD, setEnteredD] = useState("0.001");
  const [enteredN, setEnteredN] = useState("10");
  const [enteredT, setEnteredT] = useState("100");
  const [enteredPk, setEnteredPk] = useState("0.7");
  const [enteredPm, setEnteredPm] = useState("0.005");
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
  const pkChangeHandler = (event) => {
    setEnteredPk(event.target.value);
  };
  const pmChangeHandler = (event) => {
    setEnteredPm(event.target.value);
  };

  const a = enteredA;
  const b = enteredB;
  const n = enteredN;
  const t = enteredT;
  const d = enteredD;
  const l = Math.ceil(Math.log2((b - a) / d + 1));
  const pk = enteredPk;
  const pm = enteredPm;

  function realToInt(xReal, a, b, l) {
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

  function xbintwo(xreltwo, a, b, l) {
    const arrayXbin = [];
    for (let i = 0; i < xreltwo.length; i++) {
      let x = xreltwo[i];
      const xI = parseInt(realToInt(x, a, b, l));
      const xB = intToBin(xI);
      arrayXbin[i] = xB;
    }
    return arrayXbin;
  }
  function xnewpop(mut, a, b, l) {
    const arrayXNew = [];
    for (let i = 0; i < mut.length; i++) {
      let x = mut[i];
      const xI = binToInt(x);
      const xB = intToreal(xI);
      arrayXNew[i] = xB;
    }
    return arrayXNew;
  }

  function parents(xreltwo, xbin2) {
    const parent = [];
    for (let i = 0; i < n; i++) {
      let r = Math.random();
      if (r <= pk) {
        parent[i] = xbin2[i];
      } else {
        parent[i] = "-";
      }
    }
    return parent;
  }

  function randpc(parent) {
    let pc = [];
    let k = 0;
    for (let i = 0; i < n; i++) {
      if (parent[0] !== "-") {
        pc[0] = Math.floor(Math.random() * (l - 2));
      }
      if (parent[i] !== "-") {
        k++;
        if (k % 2 === 0) {
          pc[i] = Math.floor(Math.random() * (l - 2));
        } else {
          pc[i] = pc[i - 1];
        }
      } else {
        pc[i] = "-";
      }
    }
    return pc;
  }
  const popNew = [];
  function crossover(first, second, p) {
    const chars = first.split("");
    const charss = second.split("");
    var head1 = "";
    let head2 = "";
    let tail1 = "";
    let tail2 = "";
    let child1 = "";
    let child2 = "";

    for (var i = 0; i < first.length; i++) {
      if (i <= p) {
        head1 = head1 + chars[i];
        head2 = head2 + charss[i];
      } else {
        tail1 = tail1 + chars[i];
        tail2 = tail2 + charss[i];
      }
    }

    child1 = head1 + tail2;
    child2 = head2 + tail1;

    popNew.push(child1);
    popNew.push(child2);

    return popNew;
  }
  function crossoverIfThereIsNotPair(first, second, p) {
    const chars = first.split("");
    const charss = second.split("");
    var head1 = "";
    let tail2 = "";
    let child1 = "";

    for (var i = 0; i < first.length; i++) {
      if (i <= p) {
        head1 = head1 + chars[i];
      } else {
        tail2 = tail2 + charss[i];
      }
    }
    child1 = head1 + tail2;

    popNew.push(child1);
    return popNew;
  }
  function removeNull(array) {
    return array.filter((x) => x !== "-");
  }
  function cross(parent, pc) {
    let k = 0;

    let dzieci = [];
    let dziecii = [];
    for (let i = 0; i < n; i++) {
      if (parent[i] !== "-") {
        k++;
      }
    }
    let onlyp = [];
    onlyp = removeNull(parent);
    for (var i = 0; i < onlyp.length; i += 2) {
      if (onlyp[i + 1] == null) {
        dzieci = crossoverIfThereIsNotPair(onlyp[i], onlyp[i - 1], pc);
      } else {
        dzieci = crossover(onlyp[i], onlyp[i + 1], pc);
      }
    }
    let m = 0;
    for (let i = 0; i < n; i++) {
      if (parent[i] !== "-") {
        dziecii[i] = dzieci[m];
        m++;
      } else {
        dziecii[i] = "-";
      }
    }

    return dziecii;
  }

  function pctab(parent, pc) {
    let pcTab = [];
    let m = 0;
    for (let i = 0; i < n; i++) {
      if (parent[i] !== "-") {
        pcTab[i] = pc[m];
        m++;
      } else {
        pcTab[i] = "-";
      }
    }
    return pcTab;
  }

  function newpopulation(xbin2, children) {
    let newTab = [];
    for (let i = 0; i < n; i++) {
      if (children[i] === "-") {
        newTab[i] = xbin2[i];
      } else {
        newTab[i] = children[i];
      }
    }
    return newTab;
  }
  function bitzm() {
    const bitZm = [];
    for (let i = 0; i < n; i++) {
      bitZm[i] = [];
    }
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < l; j++) {
        bitZm[i][j] = 0;
      }
    }
    return bitZm;
  }
  function mutationbit(bitZm, newPop) {
    let mutTab = [];
    for (let i = 0; i < n; i++) {
      let charsss = newPop[i];
      var pomut = "";
      for (let j = 0; j < l; j++) {
        var r = Math.random() * (1 - 0) + 0;
        if (r <= pm) {
          if (charsss[j] === "1") {
            pomut = pomut + "0";
            bitZm[i][j] = 1;
          } else {
            pomut = pomut + "1";
            bitZm[i][j] = 1;
          }
        } else {
          pomut = pomut + charsss[j];
        }
      }
      mutTab.push(pomut);
    }
    console.log(mutTab);
    return mutTab;
  }

  function bitpozm(xreltwo, bitZm) {
    const bitPoz = [];
    for (let i = 0; i < xreltwo.length; i++) {
      let ch = "";
      for (let j = 0; j < xreltwo.length; j++) {
        if (bitZm[i][j] === 1) {
          ch = ch + j + " ";
        }
      }
      bitPoz.push(ch);
    }
    return bitPoz;
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
    const xbin2 = xbintwo(xreltwo, a, b, l);
    const parent = parents(xreltwo, xbin2);
    const pc = randpc(n);
    const pcc = pctab(parent, pc);
    const children = cross(parent, pc);
    const newPop = newpopulation(xbin2, children);
    const bitZm = bitzm();
    const mut = mutationbit(bitZm, newPop);
    const bitPoz = bitpozm(xreltwo, bitZm);
    const xrealNew = xnewpop(mut, a, b, l);
    const funNew = fun(xrealNew);

    for (let i = 0; i < n; i++) {
      tab[i] = {
        lp: lpi[i],
        x: xreltwo[i],
        f: ftwo[i],
        xbin: xbin2[i],
        parent: parent[i],
        pc: pcc[i],
        children: children[i],
        newPop: newPop[i],
        bitPoz: bitPoz[i],
        mut: mut[i],
        xrealNew: xrealNew[i],
        funNew: funNew[i],
      };
    }

    setData(tab);
    console.log(bitPoz);
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
              <label>pk</label>
              <input
                type="number"
                min="0"
                step="0.05"
                max="1"
                value={enteredPk}
                onChange={pkChangeHandler}
              />
              <label>pm</label>
              <input
                type="number"
                min="0"
                step="0.001"
                max="1"
                value={enteredPm}
                onChange={pmChangeHandler}
              />
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
                <th>xReal*</th>
                <th>f(x)*</th>
                <th>xBin*</th>
                <th>Populacja rodziców</th>
                <th>Pc</th>
                <th>Populacja dzieci</th>
                <th>Nowa populacja</th>
                <th>Bit zmiany</th>
                <th>Mutacja</th>
                <th>Nowy xReal</th>
                <th>Nowa f(x)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val.lp}</td>
                    <td>{val.x}</td>
                    <td>{val.f}</td>
                    <td>{val.xbin}</td>
                    <td>{val.parent}</td>
                    <td>{val.pc}</td>
                    <td>{val.children}</td>
                    <td>{val.newPop}</td>
                    <td>{val.bitPoz}</td>
                    <td>{val.mut}</td>
                    <td>{val.xrealNew}</td>
                    <td>{val.funNew}</td>
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
