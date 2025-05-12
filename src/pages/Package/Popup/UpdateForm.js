import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { TextField, Button, Box, Typography, Stack, Avatar } from "@mui/material";
import * as Yup from "yup";
import ReactQuill from "react-quill";

const validationSchema = Yup.object().shape({
  PackageName: Yup.string().required("Tên gói là bắt buộc"),
  Description: Yup.string().required("Mô tả là bắt buộc"),
  Cost: Yup.number()
    .required("Giá gói là bắt buộc")
    .positive("Giá phải là số dương"),
});

const UpdateForm = ({ initialValues, onSubmit }) => {
  const [editorValue, setEditorValue] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [prevImage, setPrevImage] = useState(initialValues.image || "");
  useEffect(() => {
    setEditorValue(initialValues.description || "");
  }, [initialValues.description]);

  return (
    <Formik
      initialValues={{
        PackageName: initialValues.packageName,
        Description: initialValues.description,
        Image: null,
        Cost: initialValues.cost,
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
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
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
                fullWidth
                style={{ marginBottom: "10px" }}
              />
            )}
          </Field>
          <Field name="Description">
            {({ field, form }) => (
              <div
                style={{
                  marginBottom: "16px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label style={{ marginBottom: "8px", fontSize: "22px", }}>Nội dung</label>
                <ReactQuill
                  theme="snow"
                  value={editorValue}
                  onChange={(value) => {
                    setEditorValue(value);
                    form.setFieldValue("Description", value);
                  }}
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
                type="number"
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error ? meta.error : ""}
                fullWidth
                style={{ marginBottom: "10px" }}
              />
            )}
          </Field>
          {imgSrc && <Avatar sx={{ width: '250px', height: '250px', mb: 5 }} alt='avatar' src={imgSrc} />}
          <Field name='Image'>
            {({ field, form, meta }) => (
              <Stack direction={"row"}>
                <Button
                  component='label'
                  style={{ backgroundColor: '#EC6935', color: 'black', marginLeft: '7px' }}
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
          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={isSubmitting}
            style={{ marginTop: "16px", alignItems: "flex-start" }}
          >
            Cập nhật gói dịch vụ
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateForm;
