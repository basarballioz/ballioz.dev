import { Button, Box, Paper, Container } from "@mui/material";
import { VscMarkdown, VscChromeClose } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

export default function AppButtons({
  pages,
  selectedIndex,
  setSelectedIndex,
  setCurrentComponent,
  visiblePageIndexs,
  setVisiblePageIndexs,
}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const getBgColor = (index) => {
    if (isDark) return selectedIndex === index ? "#1e1e1e" : "#2d2d2d";
    return selectedIndex === index ? "#ffffff" : "#ececec";
  };

  const getTextColor = (index) => {
    if (isDark) return selectedIndex === index ? "white" : "#817d7a";
    return selectedIndex === index ? "#524a5f" : "#716f74";
  };

  const getCloseHoverBg = (index) => {
    if (isDark) return "#333c43";
    return selectedIndex === index ? "#e6e4e5" : "#dadada";
  };

  const getCloseHoverColor = (index) => {
    if (isDark) return selectedIndex === index ? "white" : "#817d7a";
    return selectedIndex === index ? "#44434b" : "#92938e";
  };

  const renderPageButton = (index, name, route) => (
    <Box
      key={index}
      sx={{
        display: "inline-block",
        borderRight: 1,
        borderColor: isDark ? "#252525" : "#f3f3f3",
      }}
    >
      <Button
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
          backgroundColor: getBgColor(index),
          color: getTextColor(index),
          "&.MuiButtonBase-root:hover": {
            bgcolor: getBgColor(index),
          },
          transition: "none",
          pb: 0.2,
        }}
      >
        <Box sx={{ color: "#6997d5", width: 20, height: 20, mr: 0.4, ml: -1 }}>
          <VscMarkdown />
        </Box>
        {name}
        <Box
          component={Paper}
          sx={{
            ml: 1,
            mr: -1,
            backgroundColor: getBgColor(index),
            color: isDark ? (selectedIndex === index ? "white" : "#2d2d2d") : (selectedIndex === index ? "#72736d" : "#ececec"),
            "&.MuiPaper-root:hover": {
              bgcolor: getCloseHoverBg(index),
              color: getCloseHoverColor(index),
            },
            width: 20,
            height: 20,
            transition: "none",
          }}
          elevation={0}
          onClick={(e) => {
            e.stopPropagation();
            setVisiblePageIndexs(visiblePageIndexs.filter((x) => x !== index));
          }}
        >
          <VscChromeClose />
        </Box>
      </Button>
    </Box>
  );

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: "inline-block",
        overflowX: "auto",
        overflowY: "hidden",
        whiteSpace: "nowrap",
        backgroundColor: isDark ? "#252527" : "#f3f3f3",
      }}
    >
      {pages.map(({ index, name, route }) => renderPageButton(index, name, route))}
    </Container>
  );
}
