import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { VscMarkdown } from "react-icons/vsc";

export default function AppTree({
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
  let { pathname } = useLocation();
  const [open, setOpen] = React.useState(true);

  const page = pages.find((x) => x.route === pathname);

  useEffect(() => {
    if (page) {
      setSelectedIndex(page.index);
    }
  }, [page, setSelectedIndex]);

  function renderTreeItemBgColor(index) {
    if (theme.palette.mode === "dark") {
      return selectedIndex === index ? "rgba(144,202,249,0.16)" : "transparent";
    } else {
      return selectedIndex === index ? "#295fbf" : "transparent";
    }
  }

  function renderTreeItemColor(index) {
    if (theme.palette.mode === "dark") {
      return selectedIndex === index && currentComponent === "tree"
        ? "white"
        : "#bdc3cf";
    } else {
      return selectedIndex === index ? "#e2ffff" : "#69665f";
    }
  }

  return (
    <Box sx={{ width: "100%", maxWidth: 220 }}>
      <List component="nav" dense>
        <ListItemButton onClick={() => setOpen(!open)} sx={{ py: 0.5 }}>
          <ListItemIcon sx={{ minWidth: 28 }}>
            {open ? <FolderOpenIcon sx={{ fontSize: 18, color: "#dcb67a" }} /> : <FolderIcon sx={{ fontSize: 18, color: "#dcb67a" }} />}
          </ListItemIcon>
          <ListItemText 
            primary="pages" 
            primaryTypographyProps={{ 
              fontSize: 13, 
              color: "#bdc3cf" 
            }} 
          />
          {open ? <ExpandLess sx={{ color: "#bdc3cf", fontSize: 18 }} /> : <ExpandMore sx={{ color: "#bdc3cf", fontSize: 18 }} />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding dense>
            {pages.map(({ index, name, route }) => (
              <ListItemButton
                key={index}
                sx={{ 
                  pl: 4, 
                  py: 0.25,
                  backgroundColor: renderTreeItemBgColor(index),
                  "&:hover": {
                    backgroundColor: theme.palette.mode === "dark" ? "rgba(144,202,249,0.08)" : "#e0e0e0",
                  }
                }}
                selected={selectedIndex === index}
                onClick={() => {
                  if (!visiblePageIndexs.includes(index)) {
                    const newIndexs = [...visiblePageIndexs, index];
                    setVisiblePageIndexs(newIndexs);
                  }
                  navigate(route);
                  setSelectedIndex(index);
                  setCurrentComponent("tree");
                }}
              >
                <ListItemIcon sx={{ minWidth: 24 }}>
                  <VscMarkdown color="#6997d5" size={16} />
                </ListItemIcon>
                <ListItemText 
                  primary={name} 
                  primaryTypographyProps={{ 
                    fontSize: 13, 
                    color: renderTreeItemColor(index)
                  }} 
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>
    </Box>
  );
}
