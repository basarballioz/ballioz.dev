import { Button, Box, Paper } from "@mui/material";
import React from "react";
import { VscMarkdown, VscChromeClose } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Container } from "@mui/system";

export default function AppButtons({
  pages,
  selectedIndex,
  setSelectedIndex,
  currentComponent,
  setCurrentComponent,
  visiblePageIndexs,
  setVisiblePageIndexs,
}) {
  const navigate = useNavigate();
  const theme = useTheme();

  function renderButtonBgColor(index) {
    if (theme.palette.mode === "dark") {
      return selectedIndex === index ? "#1e1e1e" : "#2d2d2d";
    } else {
      return selectedIndex === index ? "#ffffff" : "#ececec";
    }
  }

  function renderButtonColor(index) {
    if (theme.palette.mode === "dark") {
      return selectedIndex === index ? "white" : "#817d7a";
    } else {
      return selectedIndex === index ? "#524a5f" : "#716f74";
    }
  }

  function renderCloseButtonBgColor(index) {
    if (theme.palette.mode === "dark") {
      return selectedIndex === index ? "#1e1e1e" : "#2d2d2d";
    } else {
      return selectedIndex === index ? "#ffffff" : "#ececec";
    }
  }

  function renderCloseButtonColor(index) {
    if (theme.palette.mode === "dark") {
      return selectedIndex === index ? "#white" : "#2d2d2d";
    } else {
      return selectedIndex === index ? "#72736d" : "#ececec";
    }
  }

  function renderCloseButtonHoverBgColor(index) {
    if (theme.palette.mode === "dark") {
      return selectedIndex === index ? "#333c43" : "#333c43";
    } else {
      return selectedIndex === index ? "#e6e4e5" : "#dadada";
    }
  }

  function renderCloseButtonHoverColor(index) {
    if (theme.palette.mode === "dark") {
      return selectedIndex !== index ? "#817d7a" : "#white";
    } else {
      return selectedIndex === index ? "#44434b" : "#92938e";
    }
  }

  function renderPageButton(index, name, route) {
    return (
      <Box
        key={index}
        sx={{
          display: "inline-block",
          borderRight: 1,
          borderColor: theme.palette.mode === "dark" ? "#252525" : "#f3f3f3",
        }}
      >
        <Button
          key={index}
          disableRipple
          disableElevation
          disableFocusRipple
          onClick={() => {
            setSelectedIndex(index);
            setCurrentComponent("button");
            navigate(route);
          }}
          sx={{
            borderRadius: 0,
            px: 2,
            textTransform: "none",
            backgroundColor: renderButtonBgColor(index),
            color: renderButtonColor(index),
            "&.MuiButtonBase-root:hover": {
              bgcolor: renderButtonBgColor(index),
            },
            transition: "none",
            pb: 0.2,
          }}
        >
          <Box
            sx={{ color: "#6997d5", width: 20, height: 20, mr: 0.4, ml: -1 }}
          >
            <VscMarkdown />
          </Box>
          {name}
          <Box
            component={Paper}
            sx={{
              ml: 1,
              mr: -1,
              backgroundColor: renderCloseButtonBgColor(index),
              color: renderCloseButtonColor(index),
              "&.MuiPaper-root:hover": {
                bgcolor: renderCloseButtonHoverBgColor(index),
                color: renderCloseButtonHoverColor(index),
              },
              width: 20,
              height: 20,
              transition: "none",
            }}
            elevation={0}
            onClick={(e) => {
              e.stopPropagation();
              setVisiblePageIndexs(
                visiblePageIndexs.filter((x) => x !== index)
              );
            }}
          >
            <VscChromeClose />
          </Box>
        </Button>
      </Box>
    );
  }

  return (
    React.createElement(Container, {
      maxWidth: false,
      disableGutters: true,
      sx: {
        display: "inline-block",
        overflowX: "auto",
        overflowY: "hidden",
        whiteSpace: "nowrap",
        backgroundColor: theme.palette.mode === "dark" ? "#252527" : "#f3f3f3",
      }
    },
      pages.map(({ index, name, route }) =>
        renderPageButton(index, name, route)
      )
    )
  );
}
