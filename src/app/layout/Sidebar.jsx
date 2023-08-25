import React from "react";
import {
  Box,
  Link,
  Paper,
  Tooltip,
  Divider,
} from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import {
  VscFiles,
  VscHome,
} from "react-icons/vsc";
import { links } from "../pages/Home/links";

export default function Sidebar({
  expanded,
  setExpanded,
  darkMode,
  handleThemeChange,
}) {
  return (
    <Box
      sx={{
        height: `calc(100vh - 20px)`,
        backgroundColor: darkMode ? "#333333" : "#2c2c2c",
      }}
      justifyContent="space-between"
      display="flex"
      flexDirection="column"
      component={Paper}
      square
      elevation={0}
    >
      <Box
        sx={{ flexGrow: 0 }}
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        <Tooltip title="Return To Homepage" arrow placement="right">
          <Link
            href={"/"}
            underline="none"
            color="inherit"
            sx={{ WebkitTapHighlightColor: "rgba(0,0,0,0)" }}
          >
            <Box
              sx={{
                flexGrow: 0,
                cursor: "pointer",
                color: "#858585",
                fontSize: 30,
                "&:hover": {
                  color: "white",
                },
              }}
              display="flex"
              justifyContent="center"
            >
              <Box mt={0.7}>
                <VscHome />
              </Box>
            </Box>
          </Link>
        </Tooltip>
        <Box
          sx={{
            borderLeft: expanded
              ? "solid 0.12em white"
              : darkMode
                ? "solid 0.12em #333333"
                : "solid 0.12em #2c2c2c",
            cursor: "pointer",
            WebkitTapHighlightColor: "rgba(0,0,0,0)",
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <Box
            sx={{
              flexGrow: 0,
              my: 1.5,
              color: expanded ? "white" : "#858585",
              fontSize: 24,
              outline: "none",
              "&:hover": {
                color: "white",
              },
            }}
            display="flex"
            justifyContent="center"
          >
            <VscFiles />
          </Box>
        </Box>

        <Divider sx={{ m: 0.5 }} />

        {links.map((link) => (
          <Tooltip title={link.title} arrow placement="right" key={link.index}>
            <Link
              target="_blank"
              href={link.href}
              underline="none"
              color="inherit"
              sx={{ WebkitTapHighlightColor: "rgba(0,0,0,0)" }}
            >
              <Box
                sx={{
                  flexGrow: 0,
                  m: 0.5,
                  color: "#858585",
                  fontSize: 24,
                  "&:hover": {
                    color: "white",
                  },
                  cursor: "pointer",
                }}
                display="flex"
                justifyContent="center"
              >
                <Box mt={0.7}>{link.icon}</Box>
              </Box>
            </Link>
          </Tooltip>
        ))}
      </Box>

      <Box
        sx={{ flexGrow: 0, pb: 0.5 }}
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        <Tooltip
          title={darkMode ? "Lights ON" : "Lights OFF"}
          placement="right"
          arrow
        >
          <Box
            sx={{
              flexGrow: 0,
              fontSize: 24,
              color: "#858585",
              cursor: "pointer",
              "&:hover": {
                color: "white",
              },
              WebkitTapHighlightColor: "rgba(0,0,0,0)",
            }}
            display="flex"
            justifyContent="center"
            onClick={handleThemeChange}
          >
            {!darkMode ? (
              <Box>
                <DarkModeOutlinedIcon />
              </Box>
            ) : (
              <Box>
                <LightModeOutlinedIcon />
              </Box>
            )}
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
}
