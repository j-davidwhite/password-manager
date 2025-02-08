import React from "react";
import "./NewPassword.css";
import {
  TextField,
  FormControl,
  Select,
  MenuItem, // Add this import
  SelectChangeEvent,
  InputLabel,
} from "@mui/material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import GppGoodRoundedIcon from "@mui/icons-material/GppGoodRounded";
import { CircleX } from "lucide-react";

const NewPassword = ({
  addCardTrans,
  genBackTrans,
  handleNewPassPage,
  handleGenPassPage,
}) => {
  const [tag, setTag] = React.useState("");

  const handleChange = (event) => {
    setTag(event.target.value);
  };

  return (
    <div
      className={`new-password ${addCardTrans ? "show-new" : ""} ${
        genBackTrans ? "show-gen" : ""
      }`}
    >
      <div className="np--heading">
        <CircleX onClick={handleNewPassPage} className="np--back-btn" />
        <h2>ADD NEW ITEM</h2>
      </div>
      <div className="np--form">
        <TextField
          id="standard-basic"
          label="Website"
          variant="standard"
          fullWidth
          InputLabelProps={{
            style: { fontSize: "14px" },
          }}
        />
        <FormControl fullWidth>
          <InputLabel style={{ fontSize: "14px", marginLeft: "-12px" }}>
            Tag
          </InputLabel>{" "}
          <Select
            labelId="select"
            id="select"
            value={tag}
            onChange={handleChange}
            label="Tag"
            variant="standard"
            InputLabel={{
              style: { fontSize: "14px" },
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Banking</MenuItem>
            <MenuItem value={20}>Education</MenuItem>
            <MenuItem value={30}>Email</MenuItem>
            <MenuItem value={40}>Entertainment</MenuItem>
            <MenuItem value={50}>Gaming</MenuItem>
            <MenuItem value={60}>Shopping</MenuItem>
            <MenuItem value={70}>Social Media</MenuItem>
            <MenuItem value={80}>Subscriptions</MenuItem>
            <MenuItem value={90}>Utilities</MenuItem>
            <MenuItem value={100}>Work</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="standard-basic"
          label="Email or Login"
          variant="standard"
          fullWidth
          InputLabelProps={{
            style: { fontSize: "14px" }, // Change label font size
          }}
        />
        <TextField
          id="standard-basic"
          label="Password"
          variant="standard"
          fullWidth
          InputLabelProps={{
            style: { fontSize: "14px" }, // Change label font size
          }}
        />
        <div className="gp--container">
          <button className="gp--btn" onClick={handleGenPassPage}>
            <GppGoodRoundedIcon /> Generate Secure Password
          </button>
        </div>
      </div>
      <div className="np--footer">
        <button className="create-item--btn">Create Item</button>
      </div>
    </div>
  );
};

export default NewPassword;
