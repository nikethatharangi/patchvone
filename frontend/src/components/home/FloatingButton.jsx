import React from "react";
import { Fab } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

export default function FloatingButton() {
  return (
    <Fab
      color="primary"
      sx={{ position: "fixed", bottom: 40, right: 20 }}
      aria-label="chat"
    >
      <ChatIcon />
    </Fab>
  );
}
