import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import api from "../../api/api";
import background from "../../assets/images/background.jpg";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
export default function Login({ setIsLogin }) {
  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      userName: "",
      passwordHash: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .required("Tên đăng nhập là bắt buộc !")
        .max(30, "User is too long!"),
      passwordHash: Yup.string()
        .required("Vui lòng nhập mật khẩu !")
        .min(6, "At least 6 characters")
        .max(20, "Password is too long, max 20 characters!"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      console.log(values);
      const dataLogin = {
        userName: values?.userName,
        passwordHash: values?.passwordHash,
      };
      try {
        const data = await api.post("/odata/authentications/login", dataLogin);
        localStorage.setItem("user", JSON.stringify(data.data));
        console.log(data);
        switch (data.data.role) {
          case "ADMIN":
            navigate("/dashboard");
            break;
          case "PlAYER":
            navigate("/error");
            toast.error("bạn không có quyền !");
          case "KOL":
            navigate("/error");
            toast.error("bạn không có quyền !");
            break;
          default:
            navigate("/error");
            toast.error("Đăng nhập thất bại !");
        }
      } catch (error) {
        setIsLoading(false);
        if (
          error.response &&
          error.response.data &&
          error.response.data.Message
        ) {
          const messages = error.response.data.Message;
          if (messages.length > 0 && messages[0].DescriptionError) {
            for (let i = 0; i < messages[0].DescriptionError.length; i++) {
              toast.error(messages[0].DescriptionError[i]);
            }
          } else {
            toast.error("userName hoặc mật khẩu không hợp lệ !");
          }
        } else {
          toast.error("userName hoặc mật khẩu không hợp lệ !");
        }
      }
    },
  });
  // const checkDisabled = (password, userName) => {
  //   return password === "" || userName === "" || loading;
  // };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        paddingTop: "20vh",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(5px)",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            // m: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",


          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: "#2C6EBF",
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            color="black"
            sx={{ fontSize: "24px" }}
          >
            Đăng nhập vào tài khoản
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ mt: 1 }}>

              <TextField
                margin="normal"
                fullWidth
                id="userName"
                label={
                  <Typography
                    sx={{
                      fontSize: "22px",
                      marginBottom: "8px",
                    }}
                  >
                    Tên Đăng Nhập
                  </Typography>
                }
                name="userName"
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.userName && Boolean(formik.errors.userName)}
                helperText={formik.touched.userName && formik.errors.userName}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PersonOutlineOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />


              <TextField
                margin="normal"
                fullWidth
                id="passwordHash"
                label={
                  <Typography
                    sx={{
                      fontSize: "22px",
                      marginBottom: "8px",
                    }}
                  >
                    Mật khẩu
                  </Typography>
                }
                name="passwordHash"
                type="password"
                value={formik.values.passwordHash}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.passwordHash && Boolean(formik.errors.passwordHash)}
                helperText={formik.touched.passwordHash && formik.errors.passwordHash}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LockOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />


              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "black",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "darkslategray",
                  },
                }}
              >
                Đăng nhập
              </Button>


            </Box>
          </form>
        </Box>
      </Container>
    </div>
  );
}
