import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { User } from "../apiServices";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigation = useNavigate();
  const EmailStatus = {
    Verifying: "Verifying",
    Failed: "Failed",
  };

  const [emailStatus, setEmailStatus] = useState(EmailStatus.Verifying);

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    const { token } = queryString.parse(location.search);

    User.verifyEmail({ token })
      .then(() => {
        // alertService.success("Verification successful, you can now login", {
        //   keepAfterRouteChange: true,
        // });
        navigation("/login");
      })
      .catch(() => {
        setEmailStatus(EmailStatus.Failed);
      });
  }, []);

  function getBody() {
    // eslint-disable-next-line default-case
    switch (emailStatus) {
      case EmailStatus.Verifying:
        return <div>Verifying...</div>;
      case EmailStatus.Failed:
        return (
          <div>
            Verification failed, you can also verify your account using the{" "}
            <Link to="forgot-password">forgot password</Link> page.
          </div>
        );
    }
  }

  return (
    <div>
      <h3 className="card-header bg-dark text-white text-center">
        Verify Email
      </h3>
      <div className="card-body">{getBody()}</div>
    </div>
  );
};

export default VerifyEmail;
