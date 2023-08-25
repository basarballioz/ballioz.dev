import React, { useEffect } from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
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

  const page = pages.find((x) => x.route === pathname);

  useEffect(() => {
    if (page) {
      setSelectedIndex(page.index);
    }
  }, [page, setSelectedIndex]);

  function renderTreeItemBgColor(index) {
    if (theme.palette.mode === "dark") {
      return selectedIndex === index ? "rgba(144,202,249,0.16)" : "#252527";
    } else {
      return selectedIndex === index ? "#295fbf" : "#f3f3f3";
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
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ minWidth: 220 }}
      defaultExpanded={["-1"]}
    >
      <TreeItem
        nodeId="-1"
        label="Files"
        color="#bdc3cf"
        sx={{ mt: 1 }}
        onClick={() => {
          navigate("/");
          setSelectedIndex(-1);
        }}
      >
        {pages.map(({ index, name, route }) => (
          <TreeItem
            key={index}
            nodeId={index.toString()}
            label={name}
            sx={{
              color: renderTreeItemColor(index),
              backgroundColor: renderTreeItemBgColor(index),
              "&& .Mui-selected": {
                backgroundColor: renderTreeItemBgColor(index),
              },
            }}
            icon={<VscMarkdown color="#6997d5" />}
            onClick={() => {
              if (!visiblePageIndexs.includes(index)) {
                const newIndexs = [...visiblePageIndexs, index];
                setVisiblePageIndexs(newIndexs);
              }
              navigate(route);
              setSelectedIndex(index);
              setCurrentComponent("tree");
            }}
          />
        ))}
      </TreeItem>
    </TreeView>
  );
}
