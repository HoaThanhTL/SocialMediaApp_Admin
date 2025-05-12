import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../src/theme";
import Header from "../../../src/components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popover, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { toast } from "react-toastify";
import {
  getAllPostAdmin,
  updateAllReport,
} from "../../../src/redux/apiThunk/system";
import { NavLink } from "react-router-dom";
const Report = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const dispatch = useDispatch();
  const postData = useSelector((state) => state.getUser?.getPost);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  console.log("Id: ", selectedOrderId);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuClick = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
    setIsMenuOpen(true);
  };
  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };
  const handleUpdateOrder = (action) => {
    if (selectedOrderId && (action === "inactive" || action === "reject")) {
      dispatch(updateAllReport({ id: selectedOrderId, status: action }))
        .then(() => {
          dispatch(getAllPostAdmin());
          handleMenuClose();
          toast.success("Cập nhật thành công");
        })
        .catch((error) => {
          console.error("Update failed:", error);
          toast.error("Cập nhật thất bại");
        });
    }
  };
  useEffect(() => {
    setIsDataLoaded(true);
    dispatch(getAllPostAdmin());
    setIsDataLoaded(false);
  }, [dispatch]);
  const getStatusText = (status) => {
    switch (status) {
      case "InActive":
        return "Report đã được chấp nhận";
      case "Watting":
        return "Đang chờ xử lý";
      case "Reject":
        return "Bài viết không vi phạm";
      default:
        return status;
    }
  };
  const columns = [
    {
      field: `reportName`,
      headerName: "Tên bài Report",
      flex: 1,
    },
    {
      field: `description`,
      headerName: "Mô tả ",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Ngày report",
      flex: 1,
      valueGetter: (params) => {
        const createdDate = new Date(params.row.date);
        return createdDate.toLocaleDateString("en-US");
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
      flex: 1,
      valueGetter: (params) => getStatusText(params.row.status),
    },
    // {
    //   field: "view",
    //   headerName: "Xem chi tiết",
    //   flex: 1,
    //   renderCell: (params) => (
    //     <NavLink to={`/postdetailAdmin/${params.row.postId}`}>
    //       Xem chi tiết
    //     </NavLink>
    //   ),
    // },
    {
      field: "Actions",
      headerName: "Quản lý",
      flex: 0.5,
      renderCell: (params) => {
        if (params.row.status === "Watting") {
          return (
            <span style={{ cursor: "pointer" }}>
              <MoreVertIcon
                color="action"
                onClick={(event) => handleMenuClick(event, params.row.id)}
              />
              <Popover
                open={isMenuOpen && selectedOrderId === params.row.id}
                anchorEl={anchorEl}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={() => handleUpdateOrder("inactive")}>
                  Chấp nhận
                </MenuItem>
                <MenuItem onClick={() => handleUpdateOrder("reject")}>
                  Từ chối
                </MenuItem>
              </Popover>
            </span>
          );
        } else {
          return (
            <MoreVertIcon
              color="action"
              style={{ color: "gray", cursor: "not-allowed" }}
            />
          );
        }
      },
    },
  ];
  const rows =
    postData?.map((item) => {
      const account = item?.account || {};
      let email = "";
      let username = "";
      if (Array.isArray(account) && account.length > 0) {
        const firstAccount = account[0];
        email = firstAccount.email || "";
        username = firstAccount.username || "";
      } else if (typeof account === "object") {
        email = account.email || "";
        username = account.username || "";
      }
      // console.log("id report: ", id);
      return {
        id: item.id,
        email: email,
        username: username,
        reportName: item.reportName,
        status: item.status,
        date: item.createdAt,
        description: item.description,
      };
    }) || [];

  return (
    <Box m="20px">
      <Header title="Dữ liệu" subtitle="Quản lý các bài viết bị báo cáo" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          pageSize={10}
          pagination
        />
      </Box>
    </Box>
  );
};

export default Report;
