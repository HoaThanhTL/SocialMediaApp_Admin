import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound";
import { BrowserRouter, Route, Routes, useLocation, Outlet, Navigate } from "react-router-dom";
import { ColorModeContext, useMode } from "../theme";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import Dashboard from "../pages/Dashboard/dashboard";
import GetUser from "../pages/User/ListUser";
import Report from "../pages/Report/Report";
import BanUser from "../pages/Reporter/BanUser";
import ListPackage from "../pages/Package/ListPackage";
import AddPackage from "../pages/Package/AddPackage";

// Định nghĩa các tuyến đường công khai
export const publicRouters = [
  {
    path: "/",
    name: "login",
    component: Login,
    layout: null,
  },
  {
    path: "/error",
    name: "error",
    component: NotFound,
    layout: null,
  },
];

// Định nghĩa các tuyến đường admin
export const adminRouters = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    layout: DefaultLayout,
  },
  {
    path: "/getUser",
    name: "getUser",
    component: GetUser,
    layout: DefaultLayout,
  },
  {
    path: "/getPost",
    name: "getPost",
    component: Report,
    layout: DefaultLayout,
  },
  {
    path: "/getBanUser",
    name: "getBanUser",
    component: BanUser,
    layout: DefaultLayout,
  },
  {
    path: "/getPackage",
    name: "getPackage",
    component: ListPackage,
    layout: DefaultLayout,
  },
  {
    path: "/addPackage",
    name: "addPackage", // Sửa lỗi: tên không nên là "/addPackage"
    component: AddPackage,
    layout: DefaultLayout,
  },
];

// Thành phần cuộn lên đầu trang
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

// Thành phần bảo vệ tuyến đường admin
const AdminRouter = () => {
  // Thêm logic kiểm tra quyền admin (ví dụ: kiểm tra token, trạng thái đăng nhập)
  const isAdmin = true; // Thay bằng logic thực tế, ví dụ: kiểm tra từ localStorage hoặc Redux

  if (!isAdmin) {
    // Nếu không phải admin, chuyển hướng về trang login
    return <Navigate to="/" replace />;
  }

  // Nếu là admin, render các tuyến đường con
  return <Outlet />;
};

// Thành phần định tuyến chính
export const RouterComponents = () => {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <div className="App">
            <ScrollToTop />
            <Routes>
              {publicRouters.map((route, index) => {
                const Page = route.component;
                let Layout = DefaultLayout;
                if (route.layout) {
                  Layout = route.layout;
                } else if (route.layout === null) {
                  Layout = Fragment;
                }
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                );
              })}
              {/* Sử dụng AdminRouter để bảo vệ các tuyến đường admin */}
              <Route element={<AdminRouter />}>
                {adminRouters.map((route, index) => {
                  const Page = route.component;
                  let Layout = DefaultLayout;
                  if (route.layout) {
                    Layout = route.layout;
                  } else if (route.layout === null) {
                    Layout = Fragment;
                  }
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        <Layout>
                          <Page />
                        </Layout>
                      }
                    />
                  );
                })}
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

// Xuất AdminRouter làm default export để tránh lỗi
export default AdminRouter;