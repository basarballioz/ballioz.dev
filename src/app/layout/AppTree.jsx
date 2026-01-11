import { useEffect, useState } from "react";
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
  setCurrentComponent,
  visiblePageIndexs,
  setVisiblePageIndexs,
}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(true);
  const isDark = theme.palette.mode === "dark";

  const page = pages.find((x) => x.route === pathname);

  useEffect(() => {
    if (page) setSelectedIndex(page.index);
  }, [page, setSelectedIndex]);

  const getBgColor = (index) => {
    if (isDark) return selectedIndex === index ? "rgba(144,202,249,0.16)" : "transparent";
    return selectedIndex === index ? "#295fbf" : "transparent";
  };

  const getTextColor = (index) => {
    if (isDark) return selectedIndex === index ? "white" : "#bdc3cf";
    return selectedIndex === index ? "#e2ffff" : "#69665f";
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 220 }}>
      <List component="nav" dense>
        <ListItemButton onClick={() => setOpen(!open)} sx={{ py: 0.5 }}>
          <ListItemIcon sx={{ minWidth: 28 }}>
            {open ? 
              <FolderOpenIcon sx={{ fontSize: 18, color: "#dcb67a" }} /> : 
              <FolderIcon sx={{ fontSize: 18, color: "#dcb67a" }} />
            }
          </ListItemIcon>
          <ListItemText 
            primary="pages" 
            primaryTypographyProps={{ fontSize: 13, color: "#bdc3cf" }} 
          />
          {open ? 
            <ExpandLess sx={{ color: "#bdc3cf", fontSize: 18 }} /> : 
            <ExpandMore sx={{ color: "#bdc3cf", fontSize: 18 }} />
          }
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding dense>
            {pages.map(({ index, name, route }) => (
              <ListItemButton
                key={index}
                sx={{ 
                  pl: 4, 
                  py: 0.25,
                  backgroundColor: getBgColor(index),
                  "&:hover": {
                    backgroundColor: isDark ? "rgba(144,202,249,0.08)" : "#e0e0e0",
                  }
                }}
                selected={selectedIndex === index}
                onClick={() => {
                  if (!visiblePageIndexs.includes(index)) {
                    setVisiblePageIndexs([...visiblePageIndexs, index]);
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
                  primaryTypographyProps={{ fontSize: 13, color: getTextColor(index) }} 
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>
    </Box>
  );
}
