import React from "react";
import { useNavigate } from "react-router-dom";

const DemoLoginButton = (props) => {
  let navigate = useNavigate();

  const handleDemoLogin = async () => {
    const demoEmail = process.env.REACT_APP_TEMP_EMAIL;
    const demoPassword = process.env.REACT_APP_TEMP_PASSWORD;

    const apiUrl = process.env.REACT_APP_API_URL;

    if (!demoEmail || !demoPassword) {
    //   props.showAlert("Demo credentials are not set up in .env file", "warning");
      return;
    }

    const response = await fetch(`${apiUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: demoEmail, password: demoPassword }),
    });

    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/");
      props.showAlert("Logged in Successfully with Demo Account", "success");
    } else {
      props.showAlert("Demo login failed", "danger");
    }
  };

  return (
    <button
      type="button"
      className="btn btn-info"
      onClick={handleDemoLogin}
    >
      Demo Login
    </button>
  );
};

export default DemoLoginButton;
