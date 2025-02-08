import React from "react";
import "./Storage.css";
import LinearProgress from "@mui/material/LinearProgress";

const Storage = () => {
  return (
    <div className="storage">
      <div className="storage--header"> Storage</div>
      <LinearProgress
        variant="determinate"
        value={60}
        sx={{
          height: 10,
          borderRadius: 5,
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#2A68F5", // Filled bar color
          },
          backgroundColor: "#EEEEEE", // Unused bar color
        }}
      />

      <div className="storage--usage">1 MB of 10 MB used</div>
    </div>
  );
};

export default Storage;
