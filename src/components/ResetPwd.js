import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { React, useState, useEffect } from "react";
import { Changer } from "./LanguageChange";
import { Login } from "./Login";

const validate = (values) => {
  const errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!regex.test(values.email)) {
    errors.email = "This is not a valid email format!";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 4) {
    errors.password = "Password must be more than 4 characters";
  }

  if (!values.confpassword) {
    errors.confpassword = "Password is required";
  } else if (values.confpassword !== values.password) {
    errors.confpassword = "Password should be the same";
  }
  return errors;
};

function ResetPwd() {
  const [password, setPassword] = useState("");
  const [confpassword, confsetPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [confvisible, confsetVisible] = useState(false);

  const [hide, sethide] = useState(true);
  const toggleModal1 = () => {
    sethide(!hide);
  };
  const [show, setshow] = useState(false);
  const toggleModal2 = () => {
    setshow(!show);
  };

  const initialValues = { email: "", password: "", confpassword: "" };
  const [formValues, setFormvalues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...formValues, [name]: value });
    setPassword(e.target.value);
    confsetPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    console.log("is Submit:", isSubmit);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  return (
    <>
      {""}
      {hide && (
        <div className="wrapper">
          <div className="form-box login">
            <h2>
              <Changer inp="Reset Password" />
            </h2>
            <form action="#" onSubmit={handleSubmit}>
              <div className="input-box">
                <input
                  name="email"
                  type="text"
                  placeholder="Email Address"
                  value={formValues.email}
                  onChange={handleChange}
                />
              </div>
              <div className="error">
                <span>{formErrors.email}</span>
              </div>
              <div className="input-box">
                <input
                  name="password"
                  value={formValues.password}
                  type={visible ? "text" : "password"}
                  placeholder="Password"
                  onChange={handleChange}
                />
                <div className="p-2" onClick={() => setVisible(!visible)}>
                  {visible ? (
                    <EyeOutlined className="eye" />
                  ) : (
                    <EyeInvisibleOutlined className="eye" />
                  )}
                </div>
              </div>
              <div className="error">
                <span>{formErrors.password}</span>
              </div>
              <div className="input-box">
                <input
                  name="confpassword"
                  value={formValues.confpassword}
                  type={confvisible ? "text" : "password"}
                  placeholder="Confirm New Password"
                  onChange={handleChange}
                />
                <div
                  className="p-2"
                  onClick={() => confsetVisible(!confvisible)}
                >
                  {confvisible ? (
                    <EyeOutlined className="eye" />
                  ) : (
                    <EyeInvisibleOutlined className="eye" />
                  )}
                </div>
              </div>
              <div className="error">
                <span>{formErrors.confpassword}</span>
              </div>

              <button className="btn" type="submit">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      )}
      {show && (
        <div className="wrapper">
          <div className="form-box">
            <h2>Reset Password</h2>
            <div className="form-box valid-box">
              <span className="border-box">
                <p>Your password was successfully reset!</p>
                <p>please log in</p>
                <a href={<Login />} className="register-link">
                  <button onClick={toggleModal2} className="btn">
                    Go to Login
                  </button>
                </a>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export { ResetPwd };
