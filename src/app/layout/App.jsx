import React, { useEffect, useState } from "react";
import {
  Container,
  createTheme,
  CssBaseline,
  darkScrollbar,
  Grid,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import AppTree from "./AppTree";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import AppButtons from "./AppButtons";
import PageBuilder from "../components/PageBuilder/PageBuilder";
import Home from "../pages/Home/Home";
import { pages } from "../pages/Home/pages";
import { isBrowser } from "react-device-detect";

function initVisiblePageIndexs(pages) {
  const tabs = [];
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    if (page.visible) tabs.push(page.index);
  }
  return tabs;
}

export default function App() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(isBrowser);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [currentComponent, setCurrentComponent] = useState("");
  const [visiblePageIndexs, setVisiblePageIndexs] = useState(initVisiblePageIndexs(pages));
  const [darkMode, setDarkMode] = useState(false);
  const [visiblePages, setVisiblePages] = useState(pages.filter((x) => x.visible));
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#FFFFFF" : "#1e1e1e",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: paletteType === "dark" ? darkScrollbar() : null,
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: "rgba(255, 255, 255, 0.12)",
          },
        },
      },
    },
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", darkMode ? "light" : "dark");
  }

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (!currentTheme) setDarkMode(true);
    else setDarkMode(currentTheme === "dark");
  }, []);

  const deletedIndex = visiblePages.find((x) => !visiblePageIndexs.includes(x.index))?.index;

  useEffect(() => {
    const newPages = visiblePageIndexs.map((index) => pages.find((x) => x.index === index)).filter(Boolean);
    setVisiblePages(newPages);

    if (visiblePageIndexs.length === 0) {
      setSelectedIndex(-1);
      navigate("/");
    } else if (
      deletedIndex === selectedIndex &&
      deletedIndex > Math.max(...visiblePageIndexs)
    ) {
      setSelectedIndex(Math.max(...visiblePageIndexs));
      const page = pages.find((x) => x.index === Math.max(...visiblePageIndexs));
      if (page) navigate(page.route);
    } else if (
      deletedIndex === selectedIndex &&
      deletedIndex < Math.max(...visiblePageIndexs)
    ) {
      setSelectedIndex(Math.min(...visiblePageIndexs));
      const page = pages.find((x) => x.index === Math.min(...visiblePageIndexs));
      if (page) navigate(page.route);
    }
  }, [visiblePageIndexs, navigate, deletedIndex, selectedIndex]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Container sx={{ m: 0, p: 0, overflowY: "hidden" }} maxWidth={false} disableGutters>
        <Grid container sx={{ overflow: "auto", overflowY: "hidden" }}>
          <Grid container sx={{ overflow: "auto" }}>
            <Grid item sx={{ width: 50 }}>
              <Sidebar
                setExpanded={setExpanded}
                expanded={expanded}
                darkMode={darkMode}
                handleThemeChange={handleThemeChange}
                setSelectedIndex={setSelectedIndex}
              />
            </Grid>
            {expanded && (
              <Grid
                item
                sx={{
                  backgroundColor: darkMode ? "#252527" : "#f3f3f3",
                  width: 220,
                }}
              >
                <Stack sx={{ mt: 1 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 1.4 }}>
                    EXPLORER
                  </Typography>
                  <AppTree
                    pages={pages.filter((x) => x.visible)}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                    currentComponent={currentComponent}
                    setCurrentComponent={setCurrentComponent}
                    visiblePageIndexs={visiblePageIndexs}
                    setVisiblePageIndexs={setVisiblePageIndexs}
                  />
                </Stack>
              </Grid>
            )}
            <Grid item xs zeroMinWidth>
              <Grid sx={{ height: "33px" }}>
                <AppButtons
                  pages={visiblePages}
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
                  currentComponent={currentComponent}
                  setCurrentComponent={setCurrentComponent}
                  visiblePageIndexs={visiblePageIndexs}
                  setVisiblePageIndexs={setVisiblePageIndexs}
                />
              </Grid>
              <Grid
                sx={{
                  scrollBehavior: "smooth",
                  overflowY: "auto",
                  height: `calc(100vh - 20px - 33px)`,
                }}
              >
                <Routes>
                  <Route path="/" element={<Navigate to="/overview" replace />} />
                  {pages.map(({ index, name, route }) => (
                    <Route
                      key={index}
                      path={route}
                      element={<PageBuilder path={`./pages/${name}`} />}
                    />
                  ))}
                  <Route path="*" element={<Navigate to="/overview" replace />} />
                </Routes>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            sx={{
              position: "fixed",
              bottom: 0,
              width: "100%"
            }}
            item lg={12} md={12} sm={12} xs={12}
          >
            <Footer />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider >
  );
}
