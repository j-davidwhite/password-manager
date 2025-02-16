import React, { useState, useEffect } from "react";
import "./GeneratePassword.css";
import { CircleArrowLeft } from "lucide-react";
import generatePassword from "generate-password";
import { Box, Slider, Switch, FormControlLabel } from "@mui/material";
import CopyButton from "../Copybutton/CopyButton";

const GeneratePassword = ({
  addCardTrans,
  genCardTrans,
  handleNewPassPage,
  handleGenPassPage,
}) => {
  const [length, setLength] = useState(12);
  const [uppercase, setUppercase] = useState(false);
  const [digits, setDigits] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");

  // Define createPassword function before useEffect
  const createPassword = () => {
    const password = generatePassword.generate({
      length: length,
      numbers: digits,
      symbols: symbols,
      uppercase: uppercase,
      excludeSimilarCharacters: true,
      strict: true,
    });

    setGeneratedPassword(password);
  };

  useEffect(() => {
    createPassword();
  }, [length, uppercase, digits, symbols]);

  const handleUppercaseChange = (event) => {
    setUppercase(event.target.checked);
  };

  const handleDigitsChange = (event) => {
    setDigits(event.target.checked);
  };

  const handleSymbolsChange = (event) => {
    setSymbols(event.target.checked);
  };

  const handleSliderChange = (event, newValue) => {
    setLength(newValue);
  };

  return (
    <div className={`generate-password ${genCardTrans ? "show-gen" : ""}`}>
      <div className="gp--heading">
        <CircleArrowLeft onClick={handleGenPassPage} className="gp--back-btn" />
        <h2>GENERATE PASSWORD</h2>
      </div>
      <div className="gp--password">
        <p>Password:</p>
        <div className="gp--new-password">{generatedPassword}</div>
        <CopyButton className="copy" textToCopy={generatedPassword} />
      </div>
      <div className="gp--form">
        <Box sx={{ width: "100%" }}>
          <Slider
            value={length}
            onChange={(e, newValue) => setLength(newValue)}
            aria-label="Password Length"
            valueLabelDisplay="auto"
            min={8}
            max={25}
          />
        </Box>
        <div className="switches">
          <FormControlLabel
            control={
              <Switch
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                name="uppercase"
                color="primary"
             
              />
            }
            label="Include Uppercase Letters"
          />
          <FormControlLabel
            control={
              <Switch
                checked={digits}
                onChange={(e) => setDigits(e.target.checked)}
                name="digits"
                color="primary"
           
              />
            }
            label="Include Digits"
          />
          <FormControlLabel
            control={
              <Switch
                checked={symbols}
                onChange={(e) => setSymbols(e.target.checked)}
                name="symbols"
                color="primary"
      
              />
            }
            label="Include Symbols"
          />
        </div>
      </div>
      <button className="save--btn">Save Password</button>
    </div>
  );
};

export default GeneratePassword;
