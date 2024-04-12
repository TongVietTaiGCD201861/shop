import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { User } from "../apiServices";

function ForgotPassword() {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
  });

  function onSubmit({ email }, { setSubmitting }) {
    User.forgotPassword(email)
      .then(() => console.log("Successfully submitted"))
      .catch((error) => console.log(error))
      .finally(() => setSubmitting(false));
  }

  const handleProductClick = () => {
    navigate(`/login`);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh' }}>
          <Form className="card" style={{ width: '30%' }}>
            <h3 className="card-header">
              <FontAwesomeIcon icon={faLeftLong} className="search-icon" style={{ marginRight: '15px' }} onClick={() => handleProductClick()} />
              Forgot Password
            </h3>
            <div className="card-body">
              <div className="form-group">
                <label>Email</label>
                <Field
                  name="email"
                  type="text"
                  className={
                    "form-control" +
                    (errors.email && touched.email ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                  >
                    {isSubmitting && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    Submit
                  </button>

                </div>
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>

  );
}

export { ForgotPassword };

