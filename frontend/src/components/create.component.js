import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Shirt } from "../apiServices";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";

const brands = [
  {
    value: "GUCCI",
    label: "GUCCI",
  },
  {
    value: "LV",
    label: "LV",
  },
  {
    value: "ADIDAS",
    label: "ADIDAS",
  },
  {
    value: "NIKE",
    label: "NIKE",
  },
];

const sex = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
];

const initialValue = {
  name: "",
  brand: "GUCCI",
  createdDate: new Date(),
  sex: true,
  price: 0,
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  brand: Yup.string().required("Brand is required"),
  createdDate: Yup.date().required("Created Date is required"),
  sex: Yup.string().required("Sex is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
});

const Create = () => {
  const navigation = useNavigate();
  const counter = useSelector((state) => state.counter);
  const user = useSelector((state) => state.user);

  const { handleSubmit, values, setValues, touched, errors, handleBlur } =
    useFormik({
      initialValues: initialValue,
      validationSchema: validationSchema,
      onSubmit: (values) => {
        Shirt.post(values, user.token)
          .then((res) => {
            navigation("/");
          })
          .catch((err) => console.log(err));
      },
    });

  useEffect(() => {
    console.log(values);
  }, [values]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleChangePrice = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: Number(value) });
  };

  const handleChangeSex = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value === "Male" });
  };

  const handleChangeDate = (value) => {
    setValues({ ...values, createdDate: value });
  };

  return (
    <>
      <h1>{counter}</h1>
      <h1
        style={{ textAlign: "center",  marginBottom: "10px" }}
      >
        Create New Shirt
      </h1>
      <form
        style={{
          diplay: "flex",
          flexDirection: "column",
          maxWidth: "800px",
          margin: "0 auto",
          marginTop: 3,
        }}
      >
        <TextField
          label="Name"
          variant="outlined"
          name="name"
          fullWidth
          required
          value={values.name}
          onChange={(e) => handleChange(e)}
          onBlur={handleBlur}
          error={touched.name && Boolean(errors.name)}
          helperText={touched.name && errors.name}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Brand"
          variant="outlined"
          name="brand"
          fullWidth
          required
          select
          sx={{ marginBottom: 2 }}
          value={values.brand}
          onBlur={handleBlur}
          error={touched.brand && Boolean(errors.brand)}
          helperText={touched.brand && errors.brand}
          onChange={(e) => handleChange(e)}
        >
          {brands.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {/* <TextField
        label="Created Date"
        variant="outlined"
        name="createdDate"
        fullWidth
        required
        type="date"
        sx={{ marginBottom: 2 }}
      /> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
            <DateTimePicker
              label="Created Date"
              value={dayjs(values.createdDate)}
              onChange={(newValue) => handleChangeDate(newValue)}
              onBlur={handleBlur}
              error={touched.createdDate && Boolean(errors.createdDate)}
              helperText={touched.createdDate && errors.createdDate}
            />
          </DemoContainer>
        </LocalizationProvider>

        <TextField
          label="Sex"
          variant="outlined"
          name="sex"
          fullWidth
          required
          select
          value={values.sex ? "Male" : "Female"}
          onBlur={handleBlur}
          onChange={(e) => handleChangeSex(e)}
          sx={{ marginBottom: 2, marginTop: 2 }}
          error={touched.sex && Boolean(errors.sex)}
          helperText={touched.sex && errors.sex}
        >
          {sex.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Price"
          variant="outlined"
          name="price"
          fullWidth
          required
          type="number"
          value={values.price}
          onBlur={handleBlur}
          error={touched.price && Boolean(errors.price)}
          helperText={touched.price && errors.price}
          onChange={(e) => handleChangePrice(e)}
          sx={{ marginBottom: 2 }}
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default Create;
