import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ColorModeContext, useMode } from "../theme";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import AdminRouter from "./AdminRouter";
import Dashboard from "../pages/Dashboard/dashboard";
import GetUser from "../pages/User/ListUser";
import Report from "../pages/Report/Report";
import BanUser from "../pages/Reporter/BanUser";
import ListPackage from "../pages/Package/ListPackage";
import AddPackage from "../pages/Package/AddPackage";
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
    name: "/addPackage",
    component: AddPackage,
    layout: DefaultLayout,
  },
];
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}
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
              <Route exact path="/" element={<AdminRouter />}>
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
