import React, { useEffect, useState } from "react";
import "./PasswordGenerator.scss";
import { checkbox } from "../utils/constants";
import { useGlobalData } from "../context/context";

function PasswordGenerator() {
  const { passwordIncludes, setPasswordIncludes, setGeneratedPassword } = useGlobalData();

  const [passwordOption, setPasswordOption] = useState({});
  const [passwordStrength, setPasswordStrength] = useState("Too Weak");
  const [bars, setBars] = useState(1);
  const [trueCount, setTrueCount] = useState(0);
  const [styles, setStyles] = useState({
    backgroundColor: "",
    borderColor: "",
  });

  const numberOfBars = [...Array(4).keys()];

  useEffect(() => {
    setTrueCount(Object.values(passwordIncludes).filter((val) => val === true).length);
    const passLength = passwordIncludes.password_length;
    const tooweak = 20 * 0.25;
    const weak = 20 * 0.5;
    const medium = 20 * 0.75;

    if (passLength <= tooweak) {
      setStyles({
        backgroundColor: "hsl(var(--Primary-200))",
        borderColor: "hsl(var(--Primary-200))",
      });
      setBars(1);
      setPasswordStrength("Too Weak");
    }
    if (passLength <= weak && passLength > tooweak) {
      setStyles({
        backgroundColor: "hsl(var(--Primary-300))",
        borderColor: "hsl(var(--Primary-300))",
      });
      setBars(2);
      setPasswordStrength("Weak");
    }
    if (passLength <= medium && passLength > weak && trueCount === 2) {
      setStyles({
        backgroundColor: "hsl(var(--Primary-400))",
        borderColor: "hsl(var(--Primary-400))",
      });
      setBars(3);
      setPasswordStrength("Meduim");
    }
    if (passLength > medium && trueCount >= 3) {
      setStyles({
        backgroundColor: "hsl(var(--Primary-100))",
        borderColor: "hsl(var(--Primary-100))",
      });
      setBars(4);
      setPasswordStrength("Strong");
    }
    console.log(trueCount);
  }, [passwordIncludes]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setPasswordIncludes((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const isAnyPropertyTrue = Object.values(passwordIncludes).includes(true);

    if (!isAnyPropertyTrue || passwordIncludes.password_length == 0) {
      alert("must check atleast one");
      return;
    }

    generatePassword(passwordIncludes);

    // console.log(passwordIncludes);
    // console.log(passwordOption.symbols);
  }

  function generatePassword({
    password_length,
    Inlude_UpperCase_Letter,
    Inlude_LowerCase_Letter,
    Inlude_Numbers,
    Inlude_Symbols,
  }) {
    let charCodes = [];

    if (Inlude_UpperCase_Letter) charCodes = charCodes.concat(passwordOption.upperCase);
    if (Inlude_LowerCase_Letter) charCodes = charCodes.concat(passwordOption.lowerCase);
    if (Inlude_Numbers) charCodes = charCodes.concat(passwordOption.numbers);
    if (Inlude_Symbols) charCodes = charCodes.concat(passwordOption.symbols);

    const pass = [];

    for (let i = 0; i < Number(password_length); i++) {
      const randomPasswordPiece = charCodes[Math.floor(Math.random() * charCodes.length)];
      pass.push(String.fromCharCode(randomPasswordPiece));
    }
    setGeneratedPassword(pass.join(""));
  }

  useState(() => {
    function pushReferenceNumber(min, max) {
      const newArr = [];
      for (let i = min; i <= max; i++) {
        newArr.push(i);
      }
      return newArr;
    }

    setPasswordOption((prevData) => ({
      ...prevData,
      upperCase: pushReferenceNumber(65, 90),
      lowerCase: pushReferenceNumber(97, 122),
      numbers: pushReferenceNumber(48, 57),
      symbols: pushReferenceNumber(33, 47)
        .concat(pushReferenceNumber(58, 64))
        .concat(pushReferenceNumber(91, 96))
        .concat(pushReferenceNumber(123, 126)),
    }));
  }, []);

  return (
    <form
      className="generator"
      onSubmit={handleSubmit}
    >
      <header className="generator__header">
        <p>Character Lenght</p>
        <p className="character__len-val">{passwordIncludes.password_length}</p>
      </header>
      <input
        type="range"
        className="password-len-slider"
        max={20}
        min={0}
        name="password_length"
        value={passwordIncludes.password_length}
        onChange={handleChange}
      />

      {checkbox.map((item) => {
        return (
          <label
            htmlFor={item.connection}
            key={item.id}
            className="checkbox"
          >
            <input
              type="checkbox"
              id={item.connection}
              checked={passwordIncludes[item.connection]}
              onChange={handleChange}
              name={item.connection}
            />
            <p>{item.title}</p>
            {/* <svg
              width="14"
              height="12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke="#18171F"
                stroke-width="3"
                fill="none"
                d="M1 5.607 4.393 9l8-8"
              />
            </svg> */}
          </label>
        );
      })}

      <div className="password_strength">
        <p>strength</p>
        <div className="bar__container">
          {passwordStrength && <p>{passwordStrength}</p>}
          {numberOfBars.map((item, idx) => {
            return (
              <div
                className={`bar ${idx < 2 ? "true" : "false"}`}
                key={item}
                style={idx < bars ? styles : null}
              ></div>
            );
          })}
          {/* <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div> */}
        </div>
      </div>

      <button className="generate-btn">
        Generate
        <svg
          width="12"
          height="12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#24232C"
            d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z"
          />
        </svg>
      </button>
    </form>
  );
}

export default PasswordGenerator;
