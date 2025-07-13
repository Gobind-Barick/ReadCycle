import React from "react";
import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useColorMode } from "./ThemeContext";

const ModeToggle = () => {
  const { mode, toggleColorMode } = useColorMode();

  return (
    <IconButton onClick={toggleColorMode} color="inherit">
      {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

export default ModeToggle;
