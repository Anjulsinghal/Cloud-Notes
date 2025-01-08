import React from "react";
import { useNavigate } from "react-router-dom";

const DemoLoginButton = (props) => {
  let navigate = useNavigate();

  const handleDemoLogin = async () => {
    const demoEmail = "anjulsinghal123@gmail.com";
    const demoPassword = "anjul123";

    if (!demoEmail || !demoPassword) {
    //   props.showAlert("Demo credentials are not set up in .env file", "warning");
      return;
    }

    const response = await fetch("http://localhost:5000/api/auth/login", {
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
    //   props.showAlert("Logged in Successfully with Demo Account", "success");
    } else {
    //   props.showAlert("Demo login failed", "danger");
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
