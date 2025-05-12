import React, { useEffect, useState, useCallback } from "react";
import { Box, Button, SvgIcon, useTheme } from "@mui/material";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../src/components/Header";
import { tokens } from "../../../src/theme";
import { getAllUser, openBanUserRport } from "../../redux/apiThunk/system";
import { toast } from "react-toastify";

// Khai báo type cho props của EmptyIcon
interface EmptyIconProps {
  // Bạn có thể thêm các props khác nếu cần
  className?: string; // Ví dụ: nếu bạn muốn thêm class name
  style?: React.CSSProperties;
}

// Component EmptyIcon
const EmptyIcon: React.FC<EmptyIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <circle cx="15" cy="10" r="7" fill="green" />
    </SvgIcon>
  );
};

const GetUser = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { getUser, loading, status } = useSelector((state) => ({
    getUser: state.system?.users?.data || [],
    loading: state.system?.loading || false,
    status: state.system?.status || "idle",
  }));
  const [rows, setRows] = useState<any[]>([]);

  // Fetch data on mount
  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  // Cập nhật rows khi getUser thay đổi
  useEffect(() => {
    if (getUser) {
      const mappedRows = getUser.map((item: any) => ({
        // Thay any bằng interface/type cụ thể nếu có
        id: item.accountId,
        email: item.email,
        username: item.username,
        address: item.address,
        phone: item.phone,
        dob: item.dob,
        gender: item.gender,
        isActive: item.isActive,
      }));
      setRows(mappedRows);
    }
  }, [getUser]);

  // Render loading hoặc error states
  if (loading) {
    return <Box>Loading...</Box>;
  }
  if (status === "failed") {
    return <Box>Error: Failed to fetch users</Box>;
  }

  // Hàm chuyển đổi trạng thái
  const getStatusText = useCallback((isActive: boolean) => {
    return isActive ? "Tài khoản chưa bị khóa" : "Tài khoản đã bị khóa";
  }, []);

  // Hàm chuyển đổi giới tính
  const getGenderText = useCallback((gender: boolean) => {
    return gender ? "Nữ" : "Nam";
  }, []);

  // Định nghĩa các cột cho DataGrid
  const columns: GridColDef[] = [
    // Sử dụng GridColDef
    { field: "username", headerName: "Tên người dùng", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Số điện thoại", flex: 1 },
    { field: "address", headerName: "Địa chỉ", flex: 1 },
    {
      field: "gender",
      headerName: "Giới tính",
      flex: 1,
      valueGetter: (params) => getGenderText(params.row.gender),
    },
    {
      field: "dob",
      headerName: "Ngày sinh",
      flex: 1,
      valueGetter: (params) => {
        const createdDate = new Date(params.row.dob);
        return createdDate.getFullYear() <= 1
          ? "Không xác định"
          : createdDate.toLocaleDateString("en-US");
      },
    },
    {
      field: "isActive",
      headerName: "Trạng thái",
      flex: 1,
      valueGetter: (params) => getStatusText(params.row.isActive),
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
              sx={{
                fontSize: "12px",
                backgroundColor: colors.blueAccent[700],
                "&:hover": { backgroundColor: colors.blueAccent[600] },
              }}
            >
              Mở khóa tài khoản
            </Button>
          );
        }
        return <EmptyIcon />;
      },
    },
  ];

  // Hàm xử lý mở khóa tài khoản
  const handleUnlockAccount = useCallback(
    async (accountId: string) => {
      // Đặt kiểu cho accountId
      try {
        await dispatch(openBanUserRport({ key: accountId })).unwrap();
        await dispatch(getAllUser());
        toast.success("Mở khóa tài khoản thành công");
      } catch (error) {
        toast.error("Mở khóa tài khoản thất bại");
      }
    },
    [dispatch]
  );

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

