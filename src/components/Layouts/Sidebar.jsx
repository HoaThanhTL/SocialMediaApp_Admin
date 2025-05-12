import { Sidebar as ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';

import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LockPersonOutlinedIcon from "@mui/icons-material/LockPersonOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("");
  const isAuthenticated = JSON.parse(localStorage.getItem("user"));
  
  let renderItem;
  if (isAuthenticated?.role === "ADMIN") {
    renderItem = (
      <>
        <Item title="Dashboard" to="/dashboard" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />
        <Item title="Danh sách người dùng" to="/getUser" icon={<PeopleAltOutlinedIcon />} selected={selected} setSelected={setSelected} />
        <Item title="Danh sách gói hệ thống" to="/getPackage" icon={<RequestQuoteOutlinedIcon />} selected={selected} setSelected={setSelected} />
        <Item title="Tạo gói dịch vụ" to="/addPackage" icon={<CreateNewFolderOutlinedIcon />} selected={selected} setSelected={setSelected} />
        <Item title="Danh sách tố cáo bài viết" to="/getPost" icon={<ListAltOutlinedIcon />} selected={selected} setSelected={setSelected} />
        <Item title="Danh sách tố cáo người dùng" to="/getBanUser" icon={<LockPersonOutlinedIcon />} selected={selected} setSelected={setSelected} />
      </>
    );
  }

  return (
    <Box
      sx={{
        zIndex: 1000,
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar style={{ height: "100%" }} collapsed={isCollapsed}>
        <Menu style={{ height: "100vh" }} iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ margin: "10px 0 20px 0", color: colors.grey[100] }}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <Typography variant="h2" color={colors.grey[100]}>
                  GenZStyle
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="120px"
                  height="120px"
                  src={`../../back.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ m: "10px 0 0 0" }} />
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Hệ thống quản lý
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>{renderItem}</Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
