import {
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
  Avatar,
  Stack
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { addAllPackage } from "../../redux/apiThunk/system";
const validationSchema = Yup.object().shape({
  PackageName: Yup.string().required("Tên gói là bắt buộc"),
  Description: Yup.string().required("Mô tả là bắt buộc"),
  Cost: Yup.number()
    .required("Giá gói là bắt buộc")
    .positive("Giá phải là số dương"),
});

const AddPackage = () => {
  const [imgSrc, setImgSrc] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log("values", values);
      const formData = new FormData();
      formData.append("PackageName", values.PackageName);
      formData.append("Description", values.Description);
      formData.append("Cost", values.Cost);
      formData.append("Image", values.Image);
      const respone = await dispatch(addAllPackage({ data: formData }));
      toast.success("Tạo gói dịch vụ thành công");
      resetForm();
      navigate("/getPackage");
    } catch (error) {
      console.error("Error creating post: ", error);
      toast.error("Tạo gói dịch vụ thất bại");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container fixed>
      <Box sx={{ marginTop: "20px" }}>
        <Typography
          variant="h2"
          sx={{ mb: 7, textAlign: "center", color: "red" }}
        >
          Tạo mới gói dịch vụ
        </Typography>
        <Formik
          initialValues={{
            PackageName: "",
            Description: "",
            Cost: "",
            Image: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting, handleChange, setFieldValue }) => (
            <Form>
              <Field name="PackageName">
                {({ field, meta }) => (
                  <TextField
                    {...field}
                    label={
                      <Typography
                        sx={{
                          fontSize: "22px",
                          marginTop: "-8px",


                        }}
                      >
                        Tên Gói
                      </Typography>
                    }
                    fullWidth
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error ? meta.error : ""}
                    sx={{ mb: 2 }}
                  />
                )}
              </Field>
              <Field name="Description">
                {({ field, meta, form }) => (
                  <div
                    style={{
                      marginBottom: "22px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <label style={{ marginBottom: "8px", fontSize: "22px", }}>Nội dung</label>
                    <ReactQuill
                      style={{ height: "150px", marginBottom: "16px" }}
                      theme="snow"
                      value={field.value}
                      onChange={(value) => setFieldValue("Description", value)}
                      onBlur={() => form.setFieldTouched("Description", true)}
                      modules={{
                        toolbar: [
                          ["bold", "italic", "underline", "strike"],
                          ["link"],
                          [{ list: "ordered" }, { list: "bullet" }],
                          ["clean"],
                        ],
                      }}
                    />
                  </div>
                )}
              </Field>

              <Field name="Cost">
                {({ field, meta }) => (
                  <TextField
                    {...field}
                    label={
                      <Typography
                        sx={{
                          fontSize: "20px",
                          marginTop: "-8px",

                        }}
                      >
                        Giá tiền (VND)
                      </Typography>
                    }
                    fullWidth
                    type="number"
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error ? meta.error : ""}
                    sx={{ mb: 2, marginTop: "26px", fontSize: "24px" }}
                  />
                )}
              </Field>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  mt: 3,
                }}
              >
                {imgSrc && <Avatar sx={{ width: '250px', height: '250px', mb: 5 }} alt='avatar' src={imgSrc} />}
                <Field name='Image'>
                  {({ field, form, meta }) => (
                    <Stack direction={"row"}>
                      <Button
                        component='label'
                        style={{ backgroundColor: '#58BDFF', color: 'black', marginLeft: '7px' }}
                        variant='contained'
                        htmlFor='Image'
                        sx={{ ml: 7 }}
                      >
                        Chọn hình
                        <input
                          hidden
                          type='file'
                          id='Image'
                          accept='image/png, image/jpeg'
                          onChange={(event) => {
                            const reader = new FileReader()
                            const files = event.currentTarget.files
                            if (files && files.length !== 0) {
                              reader.onload = () => setImgSrc(reader.result)
                              reader.readAsDataURL(files[0])
                            }
                            form.setFieldValue(field.name, event.currentTarget.files[0])
                          }}
                        />
                      </Button>
                      {meta.touched && !!meta.error && <div style={{ color: 'red' }}>{meta.error}</div>}
                    </Stack>
                  )}
                </Field>


              </Box>
              <ErrorMessage
                name="Image"
                component="div"
                sx={{ color: "red" }}
              />
              <Divider sx={{ mb: 2 }} />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
                color="info"
              >
                Tạo gói dịch vụ
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default AddPackage;
