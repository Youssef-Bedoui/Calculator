import "./App.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as math from "mathjs";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const Calculator = (e) => {
  const [equation, setEquation] = useState("");
  const [result, setResult] = useState("");

  function handleClick(e) {
    setResult(result.concat(e.target.name));
    setEquation(equation.concat(e.target.name));
  }

  function clear() {
    setResult("");
    setEquation("");
  }

  function backspace() {
    setResult(result.slice(0, -1));
  }

  const calculate = (e) => {
    if (e.target.name === "^") {
      setResult(
        math
          .evaluate(
            Math.pow(
              parseFloat(result.split(" "[0])),
              parseFloat(result.split(" "[1]))
            )
          )
          .toString()
      );
    }
    try {
      setResult(math.evaluate(result).toString());
    } catch (error) {
      setResult("Error");
    }
  };

  const calculateSquare = (e) => {
    if (e.target.name === "²") {
      setResult((prevResult) => {
        return prevResult ** 2;
      });
    }
  };

  useEffect(() => {
    function handleKeyPress(e) {
      const key = e.key;
      const calculatorKeys = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "+",
        "-",
        "*",
        "/",
        "(",
        ")",
        "%",
        ".",
        "²",
        "Enter",
        "Backspace",
        "Delete",
        "Escape",
      ];
      if (calculatorKeys.includes(key)) {
        if (key === "Enter") {
          calculate();
        } else if (key === "Backspace") {
          backspace();
        } else if (key === "Delete" || key === "Escape") {
          clear();
        } else {
          handleClick({ target: { name: key } });
        }
      }
    }
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  return (
    <div className="calculator">
      <form className="position-relative">
        <input
          type="text"
          className="result-screen form-control mb-3 fs-1 pt-3"
          value={(result && result) || 0}
          disabled
        />
        <input
          type="text"
          className="result-equation form-control fs-6"
          value={equation || 0}
          disabled
        />
      </form>
      <div className="calculator-keys">
        <button
          name="<-"
          className=" delete-btn btn btn-outline-primary"
          onClick={backspace}
        >
          <KeyboardBackspaceIcon />
        </button>
        <button name="+" className="btn btn-primary" onClick={handleClick}>
          +
        </button>
        <button name="-" className="btn btn-primary" onClick={handleClick}>
          -
        </button>
        <button name="*" className="btn btn-primary" onClick={handleClick}>
          &times;
        </button>
        <button name="/" className="btn btn-primary" onClick={handleClick}>
          &divide;
        </button>
        <button name="(" className="btn btn-primary" onClick={handleClick}>
          (
        </button>
        <button name=")" className="btn btn-primary" onClick={handleClick}>
          )
        </button>
        <button name="CE" className="btn btn-primary" onClick={clear}>
          CE
        </button>
        <button name="C" className="btn btn-primary" onClick={clear}>
          C
        </button>
        <button
          name="^"
          className="btn btn-primary"
          onClick={(e) => handleClick(e)}
        >
          x^
        </button>
        <button
          name="²"
          className="btn btn-primary"
          onClick={(e) => calculateSquare(e)}
        >
          x²
        </button>
        <button name="%" className="btn btn-primary" onClick={handleClick}>
          %
        </button>
        <button name="1" className="btn btn-light" onClick={handleClick}>
          1
        </button>
        <button name="2" className="btn btn-light" onClick={handleClick}>
          2
        </button>
        <button name="3" className="btn btn-light" onClick={handleClick}>
          3
        </button>
        <button name="4" className="btn btn-light" onClick={handleClick}>
          4
        </button>
        <button name="5" className="btn btn-light" onClick={handleClick}>
          5
        </button>
        <button name="6" className="btn btn-light" onClick={handleClick}>
          6
        </button>
        <button name="7" className="btn btn-light" onClick={handleClick}>
          7
        </button>
        <button name="8" className="btn btn-light" onClick={handleClick}>
          8
        </button>
        <button name="9" className="btn btn-light" onClick={handleClick}>
          9
        </button>
        <button name="*" className="btn btn-light" onClick={handleClick}>
          0
        </button>
        <button name="," className="btn btn-light" onClick={handleClick}>
          ,
        </button>
        <button
          name="="
          className="equal-sign btn btn-secondary fw-bold"
          onClick={calculate}
        >
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;
