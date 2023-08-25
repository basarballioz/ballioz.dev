import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  Button,
  Link,
  Stack
} from "@mui/material";
import { links } from "./links";
import { pages } from "./pages";

function Home({ setSelectedIndex }) {
  const { pathname } = useLocation();

  useEffect(() => {
    setSelectedIndex(-1);
    document.title = process.env.REACT_APP_TITLE_NAME;
  }, [setSelectedIndex, pathname]);

  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: `calc(100vh - 53px)` }}
    >
      <Box>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h5">Başar Ballıöz</Typography>
          <Typography variant="subtitle1" gutterBottom>
            Frontend Developer
          </Typography>
          <Stack direction="row">
            {links.map((link) => (
              <Tooltip key={link.index} title={link.title} arrow>
                <a
                  key={link.index}
                  target="_blank"
                  href={link.href}
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <IconButton size="large" color="inherit">
                    {link.icon}
                  </IconButton>
                </a>
              </Tooltip>
            ))}
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }}>
            {pages.map((page) => (
              <Link
                key={page.index}
                href={'#' + page.route}
                sx={{ marginTop: "1rem" }}
              >
                <Button
                  variant="contained"
                  size="medium"
                  sx={{ color: "#fff", borderRadius: 1, backgroundColor: "#3279CB", marginRight: "8px" }}
                >
                  {page.label}
                </Button>
              </Link>
            ))}
          </Stack>
        </Grid>
      </Box>
    </Grid>
  );
}

export default Home;
