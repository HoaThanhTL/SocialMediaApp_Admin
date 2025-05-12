import React, { useEffect } from "react";
import { Box, Button, SvgIcon, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../src/components/Header";
import { tokens } from "../../../src/theme";
import { useState } from "react";
import { getAllUser, openBanUserRport } from "../../redux/apiThunk/system";
import { toast } from "react-toastify";
function EmptyIcon(props) {
  return (
    <SvgIcon {...props}>
      <circle cx="15" cy="10" r="7" color="green" />
    </SvgIcon>
  );
}
const GetUser = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const getUser = useSelector((state) => state.system.users.data);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useEffect(() => {
      dispatch(getAllUser());
  }, [dispatch]);

  const getStatusText = (isActive) => {
    switch (isActive) {
      case true:
        return "Tài khoản chưa bị khóa";
      case false:
        return "Tài khoản đã bị khóa";
      default:
        return isActive;
    }
  };
  const getGenderText = (gender) => {
    switch (gender) {
      case true:
        return "Nữ";
      case false:
        return "Nam";
      default:
        return gender;
    }
  };
  const columns = [
    { field: "username", headerName: "Tên người dùng", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Số điện thoại", flex: 1 },
    { field: "address", headerName: "Địa chỉ", flex: 1 },
    {
      field: "gender",
      headerName: "Giới tính",
      flex: 1,
      valueGetter: (params) => {    
        return getGenderText(params.row?.gender);
      },
    },
    {
      field: "dob",
      headerName: "Ngày sinh",
      flex: 1,
      valueGetter: (params) => {
        const createdDate = new Date(params.row?.dob);
        return createdDate.toLocaleDateString("en-US");
      },
    },
    {
      field: "isActive",
      headerName: "Trạng thái",
      flex: 1,
      valueGetter: (params) => getStatusText(params.row?.isActive),
    },
    {
      field: "manage",
      headerName: "Quản lý",
      flex: 1,
      renderCell: (params) => {
        if (!params.row.isActive) {
          return (
            <Button
              color="info"
              onClick={() => handleUnlockAccount(params.row.id)}
              sx={{ fontSize: "12px" }}
            >
              Mở khóa tài khoản
            </Button>
          );
        } else {
          return <EmptyIcon />;
        }
      },
    },
  ];

  const handleUnlockAccount = (accountId) => {
    dispatch(openBanUserRport({ key: accountId })).then(() => {
      dispatch(getAllUser());
      toast.success("Mở khóa tài khoản thành công");
    });
  };
  const rows =
    getUser?.map((item) => {
      return {
        id: item.accountId,
        email: item.email,
        username: item.username,
        isVip: item.isVip,
        address: item.address,
        city: item.city,
        phone: item.phone,  
        dob: item.dob,
        gender: item.gender,
        isActive: item.isActive,
      };
      
    }) || []; 
    
    
  return (
    <Box m="20px">
      <Header title="Dữ liệu" subtitle="Thông tin người dùng hệ thống" />
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

export default GetUser;
